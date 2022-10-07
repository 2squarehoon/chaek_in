from fastapi import Depends, FastAPI, HTTPException, Form, status
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, HTTPAuthorizationCredentials

import book_cf, recent_book_meeting, bookcafe, opposite_meeting, similar_meeting, bestseller


import sys
import pandas as pd
import numpy as np
import json
import time
import random

import os
from dotenv import load_dotenv
import redis

load_dotenv()

models.Base.metadata.create_all(bind=engine)

# 서버 시작이 처음인지 아닌지 구분 코드
server_run = False


# 처음 서버시작이면
if not(server_run):
    # 테이블 불렁고 필요한 데이터 가공하고 불러오는 함수 실행 후 df에 저장
    book = crud.get_book()
    category = crud.get_category()
    booklog = crud.get_booklog()
    review = crud.get_review()
    meeting = crud.get_meeting()
    participant = crud.get_participant()
    meeting_members = crud.meeting_members(meeting, participant)
    df = crud.clean_df(book, category)

    # 서버 시작 구분 상태 변경, 이후에는 실행 안되도록
    server_run = not(server_run)
    start = time.time() 
        
try:
    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = os.getenv("REDIS_PORT")
    REDIS_DATABASE = os.getenv("REDIS_DATABASE")
    REDIS_SECRET = os.getenv("REDIS_SECRET")
    pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE, password=REDIS_SECRET)
    # pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
    rd = redis.Redis(connection_pool=pool)
    print("redis 연결 된것 같은데")
except:
    print("redis 연결 에러")
# redis.StrictRedis( ... ) 라고도 사용할 수 있다
# Python의 버전이 3으로 업데이트 되면서 함수명이 변경되었다
# 하지만 버전 호환을 위해 StrictRedis로도 연결을 할 수 있다
# 즉, Redis = StrictRedis로 동일한 기능을 하는 함수이다

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get('/api/data/books/cbf/{memberId}')
def get_recommended(memberId: int):
    # redis connection pool에서 연결 하나 갖고옴
    global rd

    # 서버 시작할 떄 가져온 데이터프레임 쓰려고 global(전역변수) 선언
    global df, booklog, review, cbf_result
    if len(booklog[booklog['member_id'] == memberId]) == 0:
        print("여기?")
        return bestseller.bestseller()
    else:
        start = time.time() # 실행시간 계산 코드
        
        key = "user:" + str(memberId) # 여기 user_cbf
        print(key)
        if rd.exists(key) == 1:
            print("여기까진 옴")
            #   redis에서 key로 조회시 값이 존재하고

        #   요청 시점의 booklog와 기록된 booklog 사이의 변겸점이 없다면
        # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
            user_book = []
            for i in booklog[booklog['member_id'] == memberId]['book_id']:
                user_book.append(i)

            #   redis에서 바로 가져와서 리턴
            json_dict = rd.get(key).decode('utf-8')
            dict_list = json.loads(json_dict)
            
            response = dict()
            response['cbfBooks'] = random.sample(dict_list, 10)

            end = time.time() # 실행 끝나는 시간 계산
            print(f"use redis: {end - start:.5f} sec")
            
            return response

        # else 이 후 없어져도 되는지 한 번 생각해보기
        else:
            print("계산하려고 들어옴")
            # 코사인 유사도 계산하는 함수 실행 후 저장
            cat_sim_sorted_ind = crud.count_sim(df)

            # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
            user_book = []
            for i in booklog[booklog['member_id'] == memberId]['book_id']:
                user_book.append(i)

            # 빈 데이터 프레임 컬럼만 지정해서 만들고
            cbf_result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                    'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
            
            # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
            for book_id in user_book[:5]:

                # book_id로 비슷한 책 찾아서
                sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, book_id, 1000)
                # 위에서 만든 빈 데이터프레임에 하나씩 추가
                cbf_result = pd.concat([cbf_result, sim_books])

            # 여러 책을 기준으로 추천 받으면 읽은 책도 추천 리스트에 포함될 수 있으니 삭제
            for bookid in user_book:
                cbf_result = cbf_result[cbf_result.index != bookid]
            # 중복값 제거
            cbf_result = cbf_result.drop_duplicates(['id'])
            
            # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
            cbf_result = cbf_result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score', 'w_rating']]
            cbf_result = cbf_result.sort_values('w_rating', ascending=False)

            key = "user:" + str(memberId)
            json_value = cbf_result.to_json(orient='records', force_ascii=False, indent=4)
            rd.set(key, json_value)
            
            # json형태로 반환하기 위해 빈 딕셔너리 생성
            response = dict()
            # 빈 딕셔너리에 key:cbfBooks
            # value: result에서 10개를 임의 추출 후 json으로 변환 to_json은 json형식으로 변환하려고 썼고
            # json.loads는 json으로 깔끔하게 만들어줘서 썼음
            response['cbfBooks'] = json.loads(cbf_result[:100].sample(10).to_json(orient='records', force_ascii=False, indent=4))
            print("응답", response)
            end = time.time() # 실행 끝나는 시간 계산
            print(f"{end - start:.5f} sec")
            return response # 반환값


@app.get('/api/data/meeting/will/{memberId}')
def get_recommend_will_meeting(memberId: int):
    # 저장된 cbf 활용, 그래서 지금은 cbf 함수 실행시키고 cbf 가져와야함
    # 레디스되고 나서 추천 리스트 어떻게 가져올지 봐야함
    global rd, book
    key = "user:" + str(memberId)
    if rd.exists(key) == 1:

        json_dict = rd.get(key).decode('utf-8')
        dict_list = json.loads(json_dict)
        cbf_result = pd.DataFrame(dict_list)
        # print(cbf_result)
        # 추천 코드
        meeting_reid = meeting.reset_index()
        result_id = list(cbf_result.sort_values('w_rating', ascending=False)['id']) # 추천 받은 책을 가중 평점으로 정렬 후 id => 리스트 
        try:
            will_read = list(meeting.groupby('meeting_status').get_group('NONE')['book_id']) # 같이 독서하는 모임의 book_id 리스트
        except:
            response = dict()
            response['willMeeting'] = []
            return response

        willmeetings = pd.DataFrame(columns = ['book_id', 'bookTitle', 'cover', 
                                                'currentMember']) 
        # 사용자가 받은 추천 리스트에 평점 높은 순으로 추천 모임 탐색 후 데이터프레임에 저장
        for bookid in result_id:
            if bookid in will_read:
                willmeetings = pd.concat([willmeetings, meeting_reid[meeting_reid['book_id'] == bookid]])
        willmeetings.rename(columns = {'created_at':'createdAt','updated_at':'updatedAt'},inplace=True)
        willmeetings['createdAt'] = pd.to_datetime(willmeetings['createdAt'], errors='coerce')
        willmeetings['createdAt'] = willmeetings['createdAt'].dt.strftime('%Y.%m.%d %H:%M')
        willmeetings['id'] = willmeetings['id'].astype('int')
        willmeetings['capacity'] = willmeetings['capacity'].astype('int')
        willmeetings.rename(columns = {'id':'meetingId'},inplace=True)

        bookTitle = []
        bookCover = []
        crrr_member = []
        for i in list(willmeetings['book_id']):
            bookCover.append(book[book['id'] == i]['cover'].iloc[0])
            bookTitle.append(book[book['id'] == i]['title'].iloc[0])
            crrr_member.append(len(willmeetings[willmeetings['book_id'] == i]['meetingMembers'].iloc[0]))
            
        willmeetings['cover'] = bookCover
        willmeetings['bookTitle'] = bookTitle
        willmeetings['currentMember'] = crrr_member
        willmeetings = willmeetings[willmeetings['meeting_status'] == 'NONE']
        response = dict()
        response['willMeetings'] = json.loads(willmeetings.to_json(orient='records', force_ascii=False, indent=4))   
        return response
            # 코사인 유사도 계산하는 함수 실행 후 저장
    else:
        cat_sim_sorted_ind = crud.count_sim(df)

        # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
        user_book = []
        for i in booklog[booklog['member_id'] == memberId]['book_id']:
            user_book.append(i)

        # 빈 데이터 프레임 컬럼만 지정해서 만들고
        cbf_result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
        
        # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
        for book_id in user_book[:5]:

            # book_id로 비슷한 책 찾아서
            sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, book_id, 1000)
            # 위에서 만든 빈 데이터프레임에 하나씩 추가
            cbf_result = pd.concat([cbf_result, sim_books])

        # 여러 책을 기준으로 추천 받으면 읽은 책도 추천 리스트에 포함될 수 있으니 삭제
        for bookid in user_book:
            cbf_result = cbf_result[cbf_result.index != bookid]
            
        # 중복값 제거
        cbf_result = cbf_result.drop_duplicates(['id'])

        # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
        cbf_result = cbf_result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score', 'w_rating']]
        cbf_result = cbf_result.sort_values('w_rating', ascending=False)
        

        key = "user:" + str(memberId)
        json_value = cbf_result.to_json(orient='records', force_ascii=False, indent=4)
        # json_value = json.dumps(value, ensure_ascii=False).encode('utf-8')
        rd.set(key, json_value)
        meeting_reid = meeting.reset_index()
        result_id = list(cbf_result.sort_values('w_rating', ascending=False)['id']) # 추천 받은 책을 가중 평점으로 정렬 후 id => 리스트 
        try:
            will_read = list(meeting.groupby('meeting_status').get_group('NONE')['book_id']) # 같이 독서하는 모임의 book_id 리스트
        except:
            response = dict()
            response['willMeeting'] = []
            return response

        willmeetings = pd.DataFrame(columns = ['book_id', 'bookTitle', 'cover', 
                                                'currentMember']) 
        # 사용자가 받은 추천 리스트에 평점 높은 순으로 추천 모임 탐색 후 데이터프레임에 저장
        for bookid in result_id:
            if bookid in will_read:
                willmeetings = pd.concat([willmeetings, meeting_reid[meeting_reid['book_id'] == bookid]])
        willmeetings.rename(columns = {'created_at':'createdAt','updated_at':'updatedAt'},inplace=True)
        willmeetings['createdAt'] = pd.to_datetime(willmeetings['createdAt'], errors='coerce')
        willmeetings['createdAt'] = willmeetings['createdAt'].dt.strftime('%Y.%m.%d %H:%M')
        willmeetings['id'] = willmeetings['id'].astype('int')
        willmeetings['capacity'] = willmeetings['capacity'].astype('int')
        willmeetings.rename(columns = {'id':'meetingId'},inplace=True)

        bookTitle = []
        bookCover = []
        crrr_member = []
        for i in list(willmeetings['book_id']):
            bookCover.append(book[book['id'] == i]['cover'].iloc[0])
            bookTitle.append(book[book['id'] == i]['title'].iloc[0])
            crrr_member.append(len(willmeetings[willmeetings['book_id'] == i]['meetingMembers'].iloc[0]))
            
        willmeetings['cover'] = bookCover
        willmeetings['bookTitle'] = bookTitle
        willmeetings['currentMember'] = crrr_member
        response = dict()
        response['willMeetings'] = json.loads(willmeetings.to_json(orient='records', force_ascii=False, indent=4))   
        return response



@app.get('/api/data/books/cf/{memberId}')
def get_book_cf(memberId: int):

    start = time.time() # 실행시간 계산 코드

    response = book_cf.get_cf_books(memberId)
    
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return response


# booklog 업데이트 시 유사도 행렬 갱신 후 추천 목록 업데이트 후 redis에 저장
@app.get('/api/data/booklogs/update/{memberId}', status_code=status.HTTP_200_OK)
def booklog_update(memberId: int, result: bool = False):
    # redis connection pool에서 연결 하나 갖고옴
    global rd

    # 서버 시작할 떄 가져온 데이터프레임 쓰려고 global(전역변수) 선언
    global df, booklog, review, cbf_result

    start = time.time() # 실행시간 계산 코드

    if result:
        # 코사인 유사도 갱신 후 저장
        cat_sim_sorted_ind = crud.count_sim(df)

        # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
        user_book = crud.get_user_read(memberId, booklog, review)

        # 빈 데이터 프레임 컬럼만 지정해서 만들고
        cbf_result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
        
        # 사용자에게 추천할 책 목록 갱신
        # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
        for book_id in user_book[:5]:

            # book_id로 비슷한 책 찾아서
            sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, book_id, 1000)
            # 위에서 만든 빈 데이터프레임에 하나씩 추가
            cbf_result = pd.concat([cbf_result, sim_books])

        # 중복값 제거
        cbf_result = cbf_result.drop_duplicates(['id'])
        
        # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
        cbf_result = cbf_result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score', 'w_rating']]
        cbf_result = cbf_result.sort_values('w_rating', ascending=False)

        key = "user:" + str(memberId)
        json_value = cbf_result.to_json(orient='records', force_ascii=False, indent=4)
        # json_value = json.dumps(value, ensure_ascii=False).encode('utf-8')

        # 기존 키 제거 후
        rd.delete(key)
        # 키 값 갱신
        rd.set(key, json_value)

    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")
    
    return


@app.get('/api/data/meeting/similar/{memberId}')
def get_recommend_similar_meeting(memberId: int):
    global booklog, review, book, meeting_members
    

    return similar_meeting.get_member_sim_meeting(memberId, booklog, review, meeting_members)

    

@app.get('/api/data/meeting/recent-book/{memberId}')
def get_recent_book_meeting(memberId: int):

    start = time.time() # 실행시간 계산 코드

    response = recent_book_meeting.get_meetings(memberId)
    # response = recent_book_meeting.get_my_meetings(memberId)
    
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return response



@app.get('/api/data/bookcafe')
def get_near_bookcafe(latitude: float, longitude: float):

    start = time.time() # 실행시간 계산 코드

    response = bookcafe.get_near_bookcafe(latitude, longitude)
    
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return response



@app.get('/api/data/meeting/opposite/{memberId}')
def get_opposite_book_meeting(memberId: int):
    global booklog, review, book, meeting_members, rd
    start = time.time() # 실행시간 계산 코드

    key = "user:opp:" + str(memberId)
    if rd.exists(key) == 1:
        #  redis에서 바로 가져와서 리턴
        json_dict = rd.get(key).decode('utf-8')
        dict_list = json.loads(json_dict)
        result = pd.DataFrame(dict_list)
        print(result)
        meeting_reid = meeting_members.reset_index()
        reverse_sim_meeting = pd.DataFrame(columns = ['book_id', 'bookTitle', 'cover', 
                                            'currentMember']) 
        for bookid in list(result['id']):
            if bookid in list(meeting_reid ['book_id']):
                reverse_sim_meeting = pd.concat([reverse_sim_meeting , meeting_reid[meeting_reid['book_id'] == bookid]])
        if len(reverse_sim_meeting) == 0:

            oppositeMeetings = pd.DataFrame(columns = ['book_id', 'bookTitle', 'cover', 
                                                'currentMember']) 
            oppositeMeetings = pd.concat([oppositeMeetings, meeting_reid])
            oppositeMeetings.rename(columns = {'created_at':'createdAt','updated_at':'updatedAt'},inplace=True)
            oppositeMeetings['createdAt'] = pd.to_datetime(oppositeMeetings['createdAt'], errors='coerce')
            oppositeMeetings['createdAt'] = oppositeMeetings['createdAt'].dt.strftime('%Y.%m.%d %H:%M')
            oppositeMeetings['id'] = oppositeMeetings['id'].astype('int')
            oppositeMeetings['capacity'] = oppositeMeetings['capacity'].astype('int')
            oppositeMeetings.rename(columns = {'id':'meetingId'},inplace=True)
            bookTitle = []
            bookCover = []
            crrr_member = []
            for i in list(oppositeMeetings['book_id']):
                bookCover.append(book[book['id'] == i]['cover'].iloc[0])
                bookTitle.append(book[book['id'] == i]['title'].iloc[0])
                crrr_member.append(len(oppositeMeetings[oppositeMeetings['book_id'] == i]['meetingMembers'].iloc[0]))
            oppositeMeetings['cover'] = bookCover
            oppositeMeetings['bookTitle'] = bookTitle
            oppositeMeetings['currentMember'] = crrr_member
            response = dict()
            response['oppositeMeetings'] = json.loads(oppositeMeetings.to_json(orient='records', force_ascii=False, indent=4))
            return response
        else:
            revese_sim_meeting.rename(columns = {'created_at':'createdAt','updated_at':'updatedAt'},inplace=True)
            revese_sim_meeting['createdAt'] = pd.to_datetime(revese_sim_meeting['createdAt'], errors='coerce')
            revese_sim_meeting['createdAt'] = revese_sim_meeting['createdAt'].dt.strftime('%Y.%m.%d %H:%M')
            revese_sim_meeting['id'] = revese_sim_meeting['id'].astype('int')
            revese_sim_meeting['capacity'] = revese_sim_meeting['capacity'].astype('int')
            revese_sim_meeting.rename(columns = {'id':'meetingId'},inplace=True)
            bookTitle = []
            bookCover = []
            crrr_member = []
            for i in list(revese_sim_meeting['book_id']):
                bookCover.append(book[book['id'] == i]['cover'].iloc[0])
                bookTitle.append(book[book['id'] == i]['title'].iloc[0])
                crrr_member.append(len(revese_sim_meeting[revese_sim_meeting['book_id'] == i]['meetingMembers'].iloc[0]))
                
            revese_sim_meeting['cover'] = bookCover
            revese_sim_meeting['bookTitle'] = bookTitle
            revese_sim_meeting['currentMember'] = crrr_member
            response = dict()
            response['oppositeMeetings'] = json.loads(revese_sim_meeting.to_json(orient='records', force_ascii=False, indent=4))
            return response
    else:

        return opposite_meeting.opposite_meeting(memberId, booklog, review, meeting_members, df, rd)


@app.get('/api/data/books/bestseller')
def get_bestseller():
    start = time.time() # 실행시간 계산 코드
    response = bestseller.bestseller('bestseller')

    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return response
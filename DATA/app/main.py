from fastapi import Depends, FastAPI, HTTPException, Form, status
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import book_cf, recent_book_meeting, opposite_meeting

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

    df = crud.clean_df(book, category)
    # 서버 시작 구분 상태 변경, 이후에는 실행 안되도록
    server_run = not(server_run)

try:
    REDIS_HOST = os.getenv("REDIS_HOST")
    REDIS_PORT = integer = os.getenv("REDIS_PORT")
    REDIS_DATABASE = integer = os.getenv("REDIS_DATABASE")
    pool = redis.ConnectionPool(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
    rd = redis.Redis(connection_pool=pool)
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


# 일단 이부분만 보면 될듯
@app.get('/api/data/books/cbf/{memberId}')
def get_recommended(memberId: int):
    
    # redis connection pool에서 연결 하나 갖고옴
    global rd

    # 서버 시작할 떄 가져온 데이터프레임 쓰려고 global(전역변수) 선언
    global df, booklog, review, cbf_result

    start = time.time() # 실행시간 계산 코드
    
    key = "user:" + str(memberId)
    if rd.exists(key) == 1:
        #   redis에서 key로 조회시 값이 존재하고

    #   요청 시점의 booklog와 기록된 booklog 사이의 변겸점이 없다면
    # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
        user_book = crud.get_user_read(memberId, booklog, review)

        #   redis에서 바로 가져와서 리턴
        json_dict = rd.get(key).decode('utf-8')
        dict_list = json.loads(json_dict)
        
        response = dict()
        response['cbfBooks'] = random.sample(dict_list, 10)

        # print(response)
        print(type(response))
        
        end = time.time() # 실행 끝나는 시간 계산
        print(f"use redis: {end - start:.5f} sec")
        
        return response

    # else 이 후 없어져도 되는지 한 번 생각해보기
    else:
    
        # 코사인 유사도 계산하는 함수 실행 후 저장
        cat_sim_sorted_ind = crud.count_sim(df)

        # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
        user_book = crud.get_user_read(memberId, booklog, review)

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
        
        print("--------------------------------------------------result------------------------------------------------------------")
        print(cbf_result)

        print("--------------------------------------------------result.to_json(orient='records', force_ascii=False, indent=4)------------------------------------------------------------")
        print(cbf_result.to_json(orient='records', force_ascii=False, indent=4))

        key = "user:" + str(memberId)
        json_value = cbf_result.to_json(orient='records', force_ascii=False, indent=4)
        # json_value = json.dumps(value, ensure_ascii=False).encode('utf-8')
        print("--------------------------------------------------json.dumps(value, ensure_axcii=False).encode('utf-8')------------------------------------------------------------")
        print(json_value)
        print(type(json_value))
        rd.set(key, json_value)

        # json_value_get = json_value.decode('utf-8')
        json_value_get = rd.get("user:37").decode('utf-8')
        print("--------------------------------------------------rd.get(user:37).decode('utf-8')------------------------------------------------------------")
        print(json_value_get)
        
        # json_dict = dict(json.loads(json_value_get))

        json_dict = dict(json.loads(json_value_get))
        print("--------------------------------------------------dict(json.loads(value_get))------------------------------------------------------------")
        print(json_dict)


        # json형태로 반환하기 위해 빈 딕셔너리 생성
        response = dict()
        # 빈 딕셔너리에 key:cbfBooks
        # value: result에서 10개를 임의 추출 후 json으로 변환 to_json은 json형식으로 변환하려고 썼고
        # json.loads는 json으로 깔끔하게 만들어줘서 썼음
        response['cbfBooks'] = json.loads(cbf_result[:100].sample(10).to_json(orient='records', force_ascii=False, indent=4))
        print("------------------------------------------------response['cbfBooks']------------------------------------------------")
        print(response['cbfBooks'])
            
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
        meeting = crud.get_test_meeting_data(book)

        json_dict = rd.get(key).decode('utf-8')
        dict_list = json.loads(json_dict)
        cbf_result = pd.DataFrame(dict_list)
        # 추천 코드
        result_id = list(cbf_result.sort_values('w_rating', ascending=False)['id']) # 추천 받은 책을 가중 평점으로 정렬 후 id => 리스트 
        will_read = list(meeting.groupby('meetingCategory').get_group(2)['bookId']) # 같이 독서하는 모임의 book_id 리스트

        wiimeetings = pd.DataFrame(columns = ['meetingId', 'bookId', 'bookTitle', 'cover', 
                                            'meetingtTitle', 'currenMember', 'maxCapacity', 'meetingCategory']) 
        # 사용자가 받은 추천 리스트에 평점 높은 순으로 추천 모임 탐색 후 데이터프레임에 저장
        for bookid in result_id:
            if bookid in will_read:
                wiimeetings = pd.concat([wiimeetings, meeting[meeting['bookId'] == bookid]])

        response = dict()
        response['willMeeting'] = json.loads(wiimeetings.to_json(orient='records', force_ascii=False, indent=4))
        return response
            # 코사인 유사도 계산하는 함수 실행 후 저장
    else:
        cat_sim_sorted_ind = crud.count_sim(df)

        # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
        user_book = crud.get_user_read(memberId, booklog, review)

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
        # 중복값 제거
        cbf_result = cbf_result.drop_duplicates(['id'])
        
        # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
        cbf_result = cbf_result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score', 'w_rating']]
        cbf_result = cbf_result.sort_values('w_rating', ascending=False)
        

        key = "user:" + str(memberId)
        json_value = cbf_result.to_json(orient='records', force_ascii=False, indent=4)
        # json_value = json.dumps(value, ensure_ascii=False).encode('utf-8')
        rd.set(key, json_value)

        # json_value_get = json_value.decode('utf-8')
        json_value_get = rd.get("user:37").decode('utf-8')

        
        # json_dict = dict(json.loads(json_value_get))

        json_dict = dict(json.loads(json_value_get))

        meeting_cat = meeting.groupby('meetingCategory').get_group(2)
        result_id = list(cbf_result.sort_values('w_rating', ascending=False)['id']) # 추천 받은 책을 가중 평점으로 정렬 후 id => 리스트 
        meeting_cat = meeting.groupby('meetingCategory').get_group(2) # 같이 독서하는 모임의 book_id 리스트

        will_read = []

        for i in meeting_cat['currenMember'].index:
            if memberId not in meeting_cat['currenMember'][i]:
                will_read.append(meeting_cat['bookId'][i])

        wiimeetings = pd.DataFrame(columns = ['meetingId', 'bookId', 'bookTitle', 'cover', 
                                            'meetingtTitle', 'currenMember', 'maxCapacity', 'meetingCategory']) 
        # 사용자가 받은 추천 리스트에 평점 높은 순으로 추천 모임 탐색 후 데이터프레임에 저장
        for bookid in result_id:
            if bookid in will_read:
                wiimeetings = pd.concat([wiimeetings, meeting[meeting['bookId'] == bookid]])

        response = dict()
        response['willMeeting'] = json.loads(wiimeetings.to_json(orient='records', force_ascii=False, indent=4))
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
    global booklog, review, book
    
    meeting = crud.get_test_meeting_data(book)
    return crud.get_member_sim_meeting(memberId, booklog, review, meeting)

    
@app.get('/api/data/meeting/recent-book/{memberId}')
def get_recent_book_meeting(memberId: int):

    start = time.time() # 실행시간 계산 코드

    response = recent_book_meeting.get_meetings(memberId)
    # response = recent_book_meeting.get_my_meetings(memberId)
    
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return response

@app.get('/api/data/meeting/opposite/{memberId}')
def get_opposite_book_meeting(memberId: int):

    start = time.time() # 실행시간 계산 코드

    meeting = opposite_meeting.reverse_meeting_data(book)

    
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")

    return opposite_meeting.opposite_meeting(memberId, booklog, review, meeting, df)
from fastapi import Depends, FastAPI, HTTPException, Form
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import sys
import pandas as pd
import numpy as np
import json
import time

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

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 일단 이부분만 보면 될듯
@app.get('/api/data/books/cbf/{user_id}')
def get_recommended(user_id: int):
    # 서버 시작할 떄 가져온 데이터프레임 쓰려고 global(전역변수) 선언
    global df, booklog, review, cbf_result

    start = time.time() # 실행시간 계산 코드
    
    # 코사인 유사도 계산하는 함수 실행 후 저장
    cat_sim_sorted_ind = crud.count_sim(df)

    # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
    user_book = crud.get_user_read(user_id, booklog, review)

    # 빈 데이터 프레임 컬럼만 지정해서 만들고
    cbf_result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
    
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
    # json형태로 반환하기 위해 빈 딕셔너리 생성
    response = dict()
    # 빈 딕셔너리에 key:cbfBooks
    # value: result에서 10개를 임의 추출 후 json으로 변환 to_json은 json형식으로 변환하려고 썼고
    # json.loads는 json으로 깔끔하게 만들어줘서 썼음
    response['cbfBooks'] = json.loads(cbf_result[:100].sample(10).to_json(orient='records', force_ascii=False, indent=4))
    
    # 아래 반복문은 Response Body 형식 맞추는 코드
    for i in range(len(response['cbfBooks'])):
        item = dict()
        item['item'] = response['cbfBooks'][i]
        response['cbfBooks'][i] = item
        
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")
    return response # 반환값


@app.get('/api/data/meeting/will/{user_id}')
def get_recommend_will_meeting(user_id: int):
    # 저장된 cbf 활용, 그래서 지금은 cbf 함수 실행시키고 cbf 가져와야함
    # 레디스되고 나서 추천 리스트 어떻게 가져올지 봐야함
    global cbf_result 
    start = time.time() # 실행시간 계산 코드
    # 게시글 데이터가 없으니 임의로 생성
    # 필요 컬럼 - id, title, book_id, users(id정보), 모임의 종류(다 읽은 책 => 1, 읽을 책 => 2)
    # user_id 4가 읽은 책(5572819, 5795911. 1323591)으로 만든 모임
    titles = []
    covers = []
    maxCapacity = []
    for bookid in [2431928, 1072294, 2396943, 1006570, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728]:
        titles.append(book[book['title'] == bookid])
        covers.append(book[book['cover'] == bookid])
        maxCapacity.append(6)
        
    meeting = pd.DataFrame({'meetingId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        'bookId': [2431928, 1072294, 2396943, 1006570, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728],
                        'bookTitle': titles,
                        'cover': covers,
                        'meetingtTitle': ['완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분'],
                        'currenMember': [[42, 10], [35], [40, 26], [42, 32], [62, 9], [25, 39, 51], [47, 12], [21, 37], [57], [16, 48]],
                        'maxCapacity':maxCapacity,
                        'meetingCategory':[2, 1, 2, 1, 2, 1, 2, 1, 2, 1]
                        })
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
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")
    return response
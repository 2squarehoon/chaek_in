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


@app.get('/')
def read_df():
    global server_run
    df = crud.clean_df(crud.get_book_df(), crud.get_category())
    df_json = json.loads(df.sample(10).to_json(orient='index', force_ascii=False, indent=4))
    return df_json

# 일단 이부분만 보면 될듯
@app.get('/api/data/books/cbf/{user_id}')
def get_recommended(user_id: int):
    
    # 서버 시작할 떄 가져온 데이터프레임 쓰려고 global(전역변수) 선언
    global df, booklog, review
    start = time.time() # 실행시간 계산 코드
    
    # 코사인 유사도 계산하는 함수 실행 후 저장
    cat_sim_sorted_ind = crud.count_sim(df)

    # 사용자 id 입력하면 사용자가 읽은 책의 book_id을 리스트에 저장 후 변수에 저장
    user_book = crud.get_user_read(user_id, booklog, review)

    # 빈 데이터 프레임 컬럼만 지정해서 만들고
    result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
    
    # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
    for book_id in user_book[:5]:

        # book_id로 비슷한 책 찾아서
        sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, book_id, 20)
        # 위에서 만든 빈 데이터프레임에 하나씩 추가
        result = pd.concat([result, sim_books])

    # 혹시 모르니 중복값 제거 메서드 실행
    result = result.drop_duplicates(['id'])
    
    # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
    result = result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score']]
    
    # json형태로 반환하기 위해 빈 딕셔너리 생성
    response = dict()
    # 빈 딕셔너리에 key:cbfBooks
    # value: result에서 10개를 임의 추출 후 json으로 변환 to_json은 json형식으로 변환하려고 썼고
    # json.loads는 json으로 깔끔하게 만들어줘서 썼음
    response['cbfBooks'] = json.loads(result.sample(10).to_json(orient='records', force_ascii=False, indent=4))
    
    # 아래 반복문은 이런식으로 만들어주는 코드
    # {
    #    cbfBook: [
    #       {itme:{'isbn':~~~~,
    #              'title':~~~
    #              .......
    #}
    #}
    #]
    #} 
    for i in range(len(response['cbfBooks'])):
        item = dict()
        item['item'] = response['cbfBooks'][i]
        response['cbfBooks'][i] = item
        
    end = time.time() # 실행 끝나는 시간 계산
    print(f"{end - start:.5f} sec")
    return response # 반환값


    # 코사인 유사도 파일 저장해서 사용했을 떄 쓴 코드
    # else: 
    #     start = time.time()
    #     response = dict()

    #     response['cbfBooks'] = json.loads(result.sample(10).to_json(orient='records', force_ascii=False, indent=4))
    #     for i in range(len(response['cbfBooks'])):
    #         item = dict()
    #         item['item'] = response['cbfBooks'][i]
    #         response['cbfBooks'][i] = item
        
    #     end = time.time()
    #     print(f"{end - start:.5f} sec")
    #     return response
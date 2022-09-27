from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import itertools
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# book 테이블 불러오는 코드
def get_book_df():
    select_sql = 'SELECT * FROM book'
    book_df = pd.read_sql(select_sql, engine)
    book_df = book_df.reset_index(drop=True)
    return book_df

# category 테이블 불러오는 코드
def get_category():
    select_sql = 'SELECT * FROM category'
    category_df = pd.read_sql(select_sql, engine)
    category_df = category_df.set_index('id')

    return category_df

def clean_df(book_df, category_df):
    # 가중평점 계산 후 컬럼에 추가
    percentile = 0.8
    C = book_df['rating_score'].mean()
    m = book_df['rating_count'].quantile(percentile)

    def weighted_rating_score(record):
        v = record['rating_count']
        R = record['rating_score']
    
        return ( (v/(v + m)) * R) + ( (m/(v+m)) * C ) 

    book_df['w_rating'] = book_df.apply(weighted_rating_score, axis=1)
    
    # 데이터 전처리
    book_df['category_id'] = book_df['category_id'].fillna(0)
    book_df = book_df.astype({'category_id':'int'})
    book_df = book_df.astype({'category_id':'str'})

    # book_df에 사용할 컬럼들 머지
    df = pd.merge(book_df, category_df[['cid', 'keywords']], how='left', left_on='category_id', right_on='cid')
    
    # None 값 0으로 채움
    df = df.fillna('0')


    # 전처리한 데이터프레임 반환
    return df

# 코사인 유사도 계산하는 함수
def count_sim(df):
    
    # 문자열 벡터화 하는 모델 저장
    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))

    # df['keywrods']에 적용, 문자(한국소설, 추리소설 같은)를 벡터화 시키고 행렬로 저장
    cat_mat = count_vect.fit_transform(df['keywords'])
    # 행렬의 유사도 계산
    cat_sim = cosine_similarity(cat_mat, cat_mat) # 이게 오래 걸림
    # 행렬 정렬
    cat_sim_sorted_ind = cat_sim.argsort()[:, ::-1]
    
    # 정렬된 행렬 반환
    return cat_sim_sorted_ind

# book_id로 비슷한 책 찾기
def find_sim_book(df, sorted_ind, book_id, top_n=20):

    book_id_book = df[df['id'] == book_id] # 입력된 book_id 행 저장
    book_id_index = book_id_book.index.values # 입력된 book_id index저장
    
    # top_n의 2배에 해당하는 장르 유사성이 높은 인덱스 추출
    # book_index로 유사도 높은 40개 추출
    sim_indexes = sorted_ind[book_id_index, :(top_n*2)] # sorted_ind는 유사도 행렬임

    # 접근하기 편하게 2차원 행렬 1차원으로 변형
    sim_indexes = sim_indexes.reshape(-1)
    
    # 기준 책(입력된 book_id) 인덱스 제외
    sim_indexes = sim_indexes[sim_indexes != book_id_index]
   
    # top_n의 2배에 해당하는 후보군에서 w_rating이 높은 순으로 top_n만큼 추출
    # iloc은 데이터프레임 조회할 때 쓰는 메서드(loc, iloc)
    return df.iloc[sim_indexes].sort_values('w_rating', ascending=False)[:top_n]

def get_user_read(user_id):
    select_sql = 'SELECT * FROM research'
    r_df = pd.read_sql(select_sql, engine)
    r_df = r_df.reset_index(drop=True)

    # research에 있는 데이터들 입력된 사용자(id로 구별)가 읽은 book_id를 평점 높은 순으로 내림차순해서 리스트로 반환
    return list(r_df[r_df['member_Id'] == user_id].sort_values('score', ascending=False)['book_isbn_id'])
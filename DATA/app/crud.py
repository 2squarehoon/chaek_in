from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import itertools
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import main

import time
import json

# book 테이블 불러오는 코드
def get_book():
    select_sql = 'SELECT * FROM book'
    book = pd.read_sql(select_sql, engine)
    book= book.reset_index(drop=True)
    return book

# category 테이블 불러오는 코드
def get_category():
    select_sql = 'SELECT * FROM category'
    category = pd.read_sql(select_sql, engine)
    category = category.set_index('id')

    return category

# booklog 테이블 불러오는 코드
def get_booklog():
    select_sql = 'SELECT * FROM booklog'
    booklog = pd.read_sql(select_sql, engine)
    booklog = booklog.set_index('id')

    return booklog
# review 테이블 불러오는 코드
def get_review():
    select_sql = 'SELECT * FROM review'
    review = pd.read_sql(select_sql, engine)
    review = review.set_index('id')

    return review

def clean_df(book, category):
    # 가중평점 계산 후 컬럼에 추가
    percentile = 0.8
    C = book['rating_score'].mean()
    m = book['rating_count'].quantile(percentile)

    def weighted_rating_score(record):
        v = record['rating_count']
        R = record['rating_score']
    
        return ( (v/(v + m)) * R) + ( (m/(v+m)) * C ) 

    book['w_rating'] = book.apply(weighted_rating_score, axis=1)
    
    # 데이터 전처리
    book['category_id'] = book['category_id'].fillna(0)
    book = book.astype({'category_id':'int'})
    book = book.astype({'category_id':'str'})

    # book_df에 사용할 컬럼들 머지
    df = pd.merge(book, category[['cid', 'keywords']], how='left', left_on='category_id', right_on='cid')
    
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

def get_user_read(user_id, booklog, review):
    user_score = []
    for i in booklog[booklog['member_id'] == user_id].index:
        user_score.append(review[review['booklog_id'] == i]['score'][review[review['booklog_id'] == i]['score'].index[0]])

    
    return list(pd.DataFrame({'id':list(booklog[booklog['member_id'] == user_id]['book_id']),
             'score':user_score
             }).sort_values('score', ascending=False)['id'])

# booklog 테이블 불러오는 코드
def get_booklog_id(user_id: int):
    select_sql = 'SELECT id FROM booklog where member_id = %(user_id)s'
    booklog = pd.read_sql(select_sql, engine, params={'user_id': str(user_id)})
    booklog = booklog.set_index('id')

    return booklog
def get_test_meeting_data(book):
    # 게시글 데이터가 없으니 임의로 생성
    # 필요 컬럼 - id, title, book_id, users(id정보), 모임의 종류(다 읽은 책 => 1, 읽을 책 => 2)
    # memberId 4가 읽은 책(5572819, 5795911. 1323591)으로 만든 모임
    print(len(book))
    titles = []
    covers = []
    maxCapacity = []
    for bookid in [2431928, 1072294, 2396943, 1006570, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728]:
        # titles.append(list(book[book.index == bookid]['title'].values).pop())
        # covers.append(list(book[book.index == bookid]['cover'].values).pop())
        # print(book[book.index == bookid])
        maxCapacity.append(6)

    meeting = pd.DataFrame({'meetingId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        'bookId': [2431928, 1072294, 2396943, 1006570, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728],
                        # 'bookTitle': titles,
                        # 'cover': covers,
                        'meetingtTitle': ['완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분'],
                        'currenMember': [[42, 10], [35], [40, 26], [42, 32], [62, 9], [25, 39, 51], [47, 12], [21, 37], [57], [16, 48]],
                        'maxCapacity':maxCapacity,
                        'meetingCategory':[2, 1, 2, 1, 2, 1, 2, 1, 2, 1]
                        })
    return meeting


def get_member_sim_meeting(memberId, booklog, review, meeting):
    # 평점 DF 만들기
    rating = pd.merge(booklog, review, left_on='id', right_on='booklog_id')
    print(rating['member_id'])
    rating = rating[['member_id', 'score', 'book_id']]
    ratings = pd.pivot_table(rating, index='member_id', columns='book_id', values='score')
    ratings = ratings.fillna(0)
    
    # member간 유사도 구하기
    member_sim = cosine_similarity(ratings, ratings)
    member_sim_df = pd.DataFrame(data = member_sim, index=ratings.index, columns=ratings.index)
    
    member_sim = []
    
    # meeting에 참여한 member들 유사도 평균 구하기
    for i in meeting['currenMember'].index:
        total_sim = 0
        member_num = 0
        for j in meeting['currenMember'][i]:
            if  member_sim_df[memberId].sort_values(ascending=False)[1:][j] > 0:
                member_num += 1
                total_sim += member_sim_df[memberId].sort_values(ascending=False)[1:][j]
        if member_num > 0 :
            member_sim.append(total_sim/member_num)
        else:
            member_sim.append(0)
    # json화
    meeting['member_sim'] = member_sim
    member_sim_meeting = meeting.sort_values('member_sim', ascending=False)
    response = dict()
    response['similarMeeting'] = json.loads(member_sim_meeting.to_json(orient='records', force_ascii=False, indent=4))
    
    return response

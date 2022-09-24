from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import itertools
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_books(db: Session, skip: int = 0, limit: int = 100):
    books = db.query(models.Book).offset(skip).limit(limit).all()
    return books

def get_book_df():
    select_sql = 'SELECT * FROM book'
    book_df = pd.read_sql(select_sql, engine)
    book_df = book_df.reset_index(drop=True)
    return book_df

def get_category():
    select_sql = 'SELECT * FROM category'
    category_df = pd.read_sql(select_sql, engine)
    category_df = category_df.set_index('id')

    return category_df


def clean_df():
    book_df = get_book_df()
    category_df = get_category()

    percentile = 0.8
    C = book_df['rating_score'].mean()
    m = book_df['rating_count'].quantile(percentile)

    def weighted_rating_score(record):
        v = record['rating_count']
        R = record['rating_score']
    
        return ( (v/(v + m)) * R) + ( (m/(v+m)) * C ) 

    book_df['w_rating'] = book_df.apply(weighted_rating_score, axis=1)

    book_df['category_id'] = book_df['category_id'].fillna(0)
    book_df = book_df.astype({'category_id':'int'})
    book_df = book_df.astype({'category_id':'str'})

    df = pd.merge(book_df, category_df[['cid', 'keywords']], how='left', left_on='category_id', right_on='cid')

    df = df.fillna('0')


    # CountVectorizer를 적용하기 위해 공백문자로 word 단위가 구분되는 문자열로 반환

    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))
    print('여기다!!!')
    cat_mat = count_vect.fit_transform(df['keywords'])
    print('여기다!!!2')
    cat_sim = cosine_similarity(cat_mat, cat_mat)
    cat_sim_sorted_ind = cat_sim.argsort()[:, ::-1]

    print('마지막')
    return df, cat_sim_sorted_ind



def find_sim_book(df, sorted_ind, title_name, top_n=20):

    title_book = df[df['title'] == title_name] # 우리가 사용할 떄는 가입할 때 입력 받은 or 읽은 책중 높은 평점의 책 제목 쓰면 될듯
    title_index = title_book.index.values
    
    # top_n의 2배에 해당하는 장르 유사성이 높은 인덱스 추출
    sim_indexes = sorted_ind[title_index, :(top_n*2)]
    sim_indexes = sim_indexes.reshape(-1)
    
    # 기준 영화 인덱스 제외
    sim_indexes = sim_indexes[sim_indexes != title_index]
    
    # top_n의 2배에 해당하는 후보군에서 w_rating이 높은 순으로 top_n만큼 추출
    return df.iloc[sim_indexes].sort_values('w_rating', ascending=False)[:top_n]


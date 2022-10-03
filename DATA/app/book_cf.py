from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import random
import json

import bestseller

def get_all_review():
    review = pd.read_sql_table('review', engine)
    review = review[["id", "booklog_id", "score"]]
    return review

def get_all_booklog():
    booklog = pd.read_sql_table('booklog', engine)
    booklog = booklog[["id", "book_id", "member_id", "start_date"]]
    return booklog

def cal_item_based_collabor(review, booklog):
    rating = pd.merge(review, booklog, how='inner', left_on='booklog_id', right_on='id')
    rating = rating[["book_id", "member_id", "score"]]
    rating_matrix = rating.pivot_table('score', index = 'book_id', columns = 'member_id').fillna(0)
    item_based_collabor = cosine_similarity(rating_matrix)
    item_based_collabor = pd.DataFrame(data = item_based_collabor, index = rating_matrix.index, columns = rating_matrix.index)
    return item_based_collabor

def get_cf_books(member_id):
    review = get_all_review()
    booklog = get_all_booklog()

    member_booklog = booklog[booklog['member_id'] == member_id]
    member_books = set(member_booklog["book_id"])

    rating = pd.merge(review, member_booklog, how='right', left_on='booklog_id', right_on='id')
    rating = rating.sort_values(by='start_date', ascending=False)
    recent_books = rating[rating['score'].isnull()]["book_id"].values.tolist()
    recent_books.extend(rating[rating['score'] >= 3.0 ]["book_id"].values.tolist())

    if len(recent_books) < 2:
        return bestseller.bestseller()
    
    similarity = cal_item_based_collabor(review, booklog)
    print(type(similarity))

    simil_books = set()
    for book_id in recent_books:
        if book_id in similarity.columns:
            books = list(similarity[book_id].sort_values(ascending=False).iloc[:10].index)
            simil_books.update(books)



    ids = simil_books - member_books
    if len(ids) < 10:
        return bestseller.bestseller()

    ids = tuple(random.sample(ids, 10))

    query = "select id, isbn, title, author, cover from book where id IN {}".format(ids)
    cf_books = pd.read_sql(query, engine)

    
    response = dict()
    # 빈 딕셔너리에 key:cfBooks
    # value: json으로 변환 to_json은 json형식으로 변환하려고 썼고
    # json.loads는 json으로 깔끔하게 만들어줘서 썼음
    response['cfBooks'] = json.loads(cf_books.to_json(orient='records', force_ascii=False, indent=4))
        
    return response
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

server_run = 0

app = FastAPI()
user_id = 4

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
    get_recommended(user_id)
    server_run = 1
    return df_json

@app.get('/api/data/books/cbf/{user_id}/')
def get_recommended(user_id: int):
    global result, server_run
    if not(server_run):
        start = time.time()
        df = crud.clean_df(crud.get_book_df(), crud.get_category())
        cat_sim_sorted_ind = np.load('cos_sim.npy')
        user_book = crud.get_user_read(user_id)
        result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                    'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])
        for book_id in user_book[:5]:
            sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, book_id, 20)
            result = pd.concat([result, sim_books])

        result = result.drop_duplicates(['id'])
        result = result[['isbn', 'title', 'author', 'cover', 'rating_score']]
        end = time.time()
        print(f"{end - start:.5f} sec")

        response = json.loads(result.sample(10).to_json(orient='records', force_ascii=False, indent=4))
        end = time.time()
        print(f"{end - start:.5f} sec")
        return response
    else:
        start = time.time()
        response = dict()

        response['cbfBooks'] = json.loads(result.sample(10).to_json(orient='records', force_ascii=False, indent=4))
        for i in range(len(response['cbfBooks'])):
            item = dict()
            item['item'] = response['cbfBooks'][i]
            response['cbfBooks'][i] = item
        
        end = time.time()
        print(f"{end - start:.5f} sec")
        return response
from fastapi import Depends, FastAPI, HTTPException, Form
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import pandas as pd
import json
import math
import time

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/books/", response_model=list[schemas.Book])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    books = crud.get_books(db, skip=skip, limit=limit)
    return books


@app.get('/')
def read_df():
    df = crud.clean_df(crud.get_book_df(), crud.get_category())
    df_json = json.loads(df.sample(10).to_json(orient='index', force_ascii=False, indent=4))
    return df_json

@app.get('/api/data/books/cbf/{user_id}/')
def get_recommended(user_id: int):
    start = time.time()
    df = crud.clean_df(crud.get_book_df(), crud.get_category())
    cat_sim_sorted_ind = crud.count_sim(df)
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

    result = json.loads(result.sample(10).to_json(orient='index', force_ascii=False, indent=4))
    return result
from fastapi import Depends, FastAPI, HTTPException, Form
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine

from fastapi.responses import JSONResponse

import pandas as pd

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

@app.get("/books/")
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    select_sql = 'SELECT * FROM book'
    # items = crud.get_books(db, skip=skip, limit=limit)
    df = pd.read_sql(select_sql, engine)
    print(df.loc[0]['cover'])
    return df.to_json(orient='columns')

@app.get('/')
def read_df():
    df, cat_sim_sorted_ind = crud.clean_df()
    print('위에는 된거?')
    return 1

@app.get('/recommended/')
def get_recommended(title: str = '오베라는 남자'):
    start = time.time()
    df, cat_sim_sorted_ind = crud.clean_df()
    sim_books = crud.find_sim_book(df, cat_sim_sorted_ind, title, 20)
    
    end = time.time()
    print(f"{end - start:.5f} sec")
    
    return sim_books['cover']

@app.post("/read_books/")
async def input_book(title: str = Form()):
    return {"title": title}

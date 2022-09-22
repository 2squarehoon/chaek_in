from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User])
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


# @app.get("/users/{user_id}", response_model=schemas.User)
# def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user


# @app.post("/users/{user_id}/items/", response_model=schemas.Item)
# def create_item_for_user(
#     user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
# ):
#     return crud.create_user_item(db=db, item=item, user_id=user_id)


@app.get("/books/", response_model=list[schemas.Book])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_books(db, skip=skip, limit=limit)
    return items

# from dataclasses import asdict
# from typing import Optional

# import uvicorn
# from fastapi import FastAPI
# from app.database.conn import db
# from app.common.config import conf
# from app.routes import index, auth


# def create_app():
#     """
#     앱 함수 실행
#     :return:
#     """
#     c = conf()
#     app = FastAPI()
#     conf_dict = asdict(c)
#     db.init_app(app, **conf_dict)
#     # 데이터 베이스 이니셜라이즈

#     # 레디스 이니셜라이즈

#     # 미들웨어 정의

#     # 라우터 정의
#     app.include_router(index.router)
#     return app


# app = create_app()

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
# from typing import List, Optional
# from pydantic import BaseModel


# class ItemBase(BaseModel):
#     title: str
#     description: Optional[str] = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int
#     class Config:
#         orm_mode = True


# class UserBase(BaseModel):
#     email: str


# class UserCreate(UserBase):
#     password: str



# class User(UserBase):
#     id: int
#     is_active: bool
#     items: List[Item] = []

#     class Config:
#         orm_mode = True

from typing import Union

from pydantic import BaseModel


class BookBase(BaseModel):
    title: str
    description: Union[str, None] = None
    author = str
    # publish_date = str
    # description = str
    # cover = str
    # publisher = str
    # page = int
    # rating_score = float
    # rating_count = int


class BookCreate(BookBase):
    pass


class Book(BookBase):
    id: int
    isbn: int
    category_id: int

    class Config:
        orm_mode = True


# class CategoryBase(BaseModel):
#     email: str


# class CategoryCreate(CategoryBase):
#     password: str


# class Category(CategoryBase):
#     id: int

#     class Config:
#         orm_mode = True
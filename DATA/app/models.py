from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


from database import Base

class Book(Base):
    __tablename__ = "book"

    id = Column(Integer, primary_key=True, index=True)
    isbn = Column(String, unique=True, index=True)
    title = Column(String)
    author = Column(String)
    publish_date = Column(String)
    description = Column(String)
    cover = Column(String)
    category_id = Column(String)
    publisher = Column(String)
    page = Column(String)
    rating_score = Column(String)
    rating_count = Column(Integer)
# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)

#     items = relationship("Item", back_populates="owner")



# class Item(Base):
#     __tablename__ = "items"

#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     owner = relationship("User", back_populates="items")

# from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Da
# from sqlalchemy.orm import relationship

# from .database import Base


# class Book(Base):
#     __tablename__ = "book"

#     id = Column(Integer, primary_key=True, index=True)
#     isbn = Column(String, unique=True, index=True)
#     title = Column(String)
#     author = Column(String)
#     publish_date = Column(String)
#     description = Column(String)
#     cover = Column(String)
#     category_id = Column(String)
#     publisher = Column(String)
#     page = Column(String)
#     rating_score = Column(String)
#     rating_count = Column(Integer)

# class Category(Base):
#     __tablename__ = "category"

#     id = Column(Integer, primary_key=True, index=True)
#     cid = Column(String, unique=True, index=True)
#     name = Column(String)
#     mall = Column(String)
#     depth1 = Column(String)
#     depth2 = Column(String)
#     depth3 = Column(String)
#     depth4 = Column(String)
#     depth5 = Column(String)

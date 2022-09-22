from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql
# SQLALCHEMY_DATABASE_URL = "chaekin.cvg3ycl5pbuo.ap-northeast-2.rds.amazonaws.com"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

pymysql.install_as_MySQLdb()
host = "chaekin.cvg3ycl5pbuo.ap-northeast-2.rds.amazonaws.com"
user = "admin"
password = "chrlghk1!"
database = "testdb"

engine = create_engine(
    f"mysql+mysqldb://{user}:{password}"\
                    f"@{host}:3306/{database}",
                    encoding="utf-8"
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
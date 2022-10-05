from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import pymysql
# SQLALCHEMY_DATABASE_URL = "chaekin.cvg3ycl5pbuo.ap-northeast-2.rds.amazonaws.com"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"


pymysql.install_as_MySQLdb()
host = "j7a107.p.ssafy.io"
user = "chaekin"
password = "xBpIRi%O1q"
database = "chaekin"

engine = create_engine(
    f"mysql+mysqldb://{user}:{password}"\
                    f"@{host}:3741/{database}",
                    encoding="utf-8"
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
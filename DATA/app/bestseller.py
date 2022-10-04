from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import json

def bestseller(objectName):
    
    print("bestseller")
    query = "SELECT id, isbn, title, author, cover FROM book WHERE rating_count > (SELECT AVG(rating_count) FROM book) ORDER BY rating_score DESC LIMIT 100"
    bestseller = pd.read_sql(query, engine)

    bestseller = bestseller.sample(10)
    
    response = dict()
    response[objectName] = json.loads(bestseller.to_json(orient='records', force_ascii=False, indent=4))
    
    return response
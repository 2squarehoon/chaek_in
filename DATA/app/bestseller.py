from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import json

def bestseller():
    
    query = "SELECT * FROM book WHERE rating_count > (SELECT AVG(rating_count) FROM book) ORDER BY rating_score DESC LIMIT 100"
    bestseller = pd.read_sql(query, engine)

    bestseller = bestseller.sample(10)
    
    response = dict()
    response['bookcafes'] = json.loads(bestseller.to_json(orient='records', force_ascii=False, indent=4))
    
    return response
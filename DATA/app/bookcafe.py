from fastapi import HTTPException

from sqlalchemy.orm import Session
import models, schemas
from database import engine

import numpy as np
import pandas as pd
import random
import json

from haversine import haversine

def get_near_bookcafe(latitude, longitude):
    bookcafe = pd.read_sql_table('bookcafe', engine)

    member =  (latitude, longitude)
    bookcafe['distance'] = bookcafe.apply(lambda x: haversine(member, (x['latitude'], x['longitude'])), axis = 1)
    
    bookcafes = bookcafe.sort_values('distance').iloc[:10].drop(['distance'], axis = 1)

    response = dict()
    response['bookcafes'] = json.loads(bookcafes.to_json(orient='records', force_ascii=False, indent=4))
    
    return response
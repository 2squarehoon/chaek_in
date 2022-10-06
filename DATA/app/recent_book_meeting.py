from fastapi import HTTPException

from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd
import random
import json

def get_my_meetings(member_id):
    query = "SELECT * FROM meeting WHERE id IN (SELECT meeting_id FROM participant WHERE member_id = {})".format(member_id)
    my_meetings = list(pd.read_sql(query, engine)["id"])
    return my_meetings

def get_meetings(member_id):   
    response = dict()

    query = "SELECT book_id FROM booklog WHERE member_id = {} AND read_status = 'COMPLETE' ORDER BY created_at desc LIMIT 1".format(member_id)
    book_id = pd.read_sql(query, engine)

    if len(book_id) == 0 :
        response['meetings'] = json.loads(book_id.to_json(orient='records', force_ascii=False, indent=4))
        return response

    book_id = book_id.iat[0,0]
    query = "SELECT m.id AS meetingId, b.title AS bookTitle, b.cover AS cover, m.title AS meetingTitle, (SELECT COUNT(*) FROM participant p WHERE p.meeting_id = m.id AND p.is_removed = 0) AS currentMember, m.capacity AS maxCapacity, m.meeting_status AS meetingStatus, m.created_at AS createdAt FROM meeting m, book b WHERE m.is_removed = 0 AND m.book_id = {} AND m.book_id = b.id".format(book_id)
    meetings = pd.read_sql(query, engine)

    # currentMember < maxCapacity 인 미팅만 남기기
    idx = meetings.currentMember < meetings.maxCapacity
    meetings = meetings.loc[idx, :]

    # member_id가 참여중이지 않은 미팅만 남기기
    my_meetings = get_my_meetings(member_id)
    meetings = meetings[~meetings.meetingId.isin(my_meetings)]

    if len(meetings) == 0 :
        response['meetings'] = json.loads(meetings.to_json(orient='records', force_ascii=False, indent=4))
        return response

    meetings['createdAt'] = pd.to_datetime(meetings['createdAt'], errors='coerce')
    meetings['createdAt'] = meetings['createdAt'].dt.strftime('%Y.%m.%d %H:%M')

    print(meetings)

    response['meetings'] = json.loads(meetings.to_json(orient='records', force_ascii=False, indent=4))
    
    return response
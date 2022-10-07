import models, schemas
from database import engine
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import main

import time
import json

def get_member_sim_meeting(memberId, booklog, review, meeting):
    # 평점 DF 만들기
    meeting.rename(columns = {'created_at':'createdAt','updatedAt':'updatedAt'},inplace=True)
    rating = pd.merge(booklog, review, left_on='id', right_on='booklog_id')
    rating = rating[['member_id', 'score', 'book_id']]
    ratings = pd.pivot_table(rating, index='member_id', columns='book_id', values='score')
    ratings = ratings.fillna(0)

    # member간 유사도 구하기
    member_sim = cosine_similarity(ratings, ratings)
    member_sim_df = pd.DataFrame(data = member_sim, index=ratings.index, columns=ratings.index)
    #         print(member_sim_df[member_id].sort_values(ascending=False)[1:])
    member_sim = []

    # meeting에 참여한 member들 유사도 평균 구하기
    for i in meeting.index:
        total_sim = 0
        member_num = 0
        for j in meeting['meetingMembers'][i]:
            if j != memberId:
                try:
                    if member_sim_df[memberId].sort_values(ascending=False)[1:][j] > 0:
                        member_num += 1
                        total_sim += member_sim_df[memberId].sort_values(ascending=False)[1:][j]
                except:
                    print(j, ' 번 사용자는 평점 데이터가 없네요')
        if member_num > 0 :
            member_sim.append(total_sim/member_num)
        else:
            member_sim.append(0)

    meeting['member_sim'] = member_sim
    member_sim_meeting = meeting.sort_values('member_sim', ascending=False)
    member_sim_meeting = member_sim_meeting[member_sim_meeting['member_sim'] > 0]
    member_sim_meeting.rename(columns = {'created_at':'createdAt','updated_at':'updatedAt'},inplace=True)
    member_sim_meeting['createdAt'] = pd.to_datetime(member_sim_meeting['createdAt'], errors='coerce')
    member_sim_meeting['createdAt'] = member_sim_meeting['createdAt'].dt.strftime('%Y.%m.%d %H:%M')
    crrr_member = []
    for i in list(member_sim_meeting['book_id']):
        crrr_member.append(len(member_sim_meeting[member_sim_meeting['book_id'] == i]['meetingMembers'].iloc[0]))
    member_sim_meeting['currentMember'] = crrr_member
    response = dict()
    response['memberSimMeeting'] = json.loads(member_sim_meeting.to_json(orient='records', force_ascii=False, indent=4))    
    
    return response
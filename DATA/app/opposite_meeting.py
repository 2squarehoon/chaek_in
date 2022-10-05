import pandas as pd
import json
import time
import crud


# 반대 유사도 책 기반 모임 추천 반환
def opposite_meeting(memberId, booklog, review, meeting, df, rd):
    cat_sim_resorted_ind = crud.count_sim(df)
    user_book = crud.get_user_read(memberId, booklog, review)
    meeting.rename(columns = {'created_at':'createdAt','updatedAt':'updatedAt'},inplace=True)
    # 빈 데이터 프레임 컬럼만 지정해서 만들고
    result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])


    # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
    for book_id in user_book:

        # book_id로 비슷한 책 찾아서
        resim_books = crud.find_sim_book(df, cat_sim_resorted_ind[:, ::-1], book_id, 1000)
        # 위에서 만든 빈 데이터프레임에 하나씩 추가
        result = pd.concat([result, resim_books])

    # 여러 책을 기준으로 추천 받으면 읽은 책도 추천 리스트에 포함될 수 있으니 삭제
    for bookId in user_book:
        result = result[result.index != bookId]

    # 혹시 모르니 중복값 제거 메서드 실행
    result = result.drop_duplicates(['id'])

    # 필요한 컬럼만 다시 저장, 약 100개의 행을 가진 데이터 프레임
    result = result[['id', 'isbn', 'title', 'author', 'cover', 'rating_score', 'w_rating', 'rating_count']]

    revese_sim_meeting = pd.DataFrame(columns = ['meetingId', 'bookId', 'bookTitle', 'cover', 
                                                'meetingtTitle', 'currenMember', 'maxCapacity', 'meetingCategory'])
    
    for bookid in list(result['id']):
        if bookid in list(meeting['book_id']):

            revese_sim_meeting = pd.concat([revese_sim_meeting , meeting[meeting['book_id'] == bookid]])
    revese_sim_meeting['createdAt'] = pd.to_datetime(revese_sim_meeting['createdAt'], errors='coerce')
    revese_sim_meeting['createdAt'] = revese_sim_meeting['createdAt'].dt.strftime('%Y.%m.%d %H:%M')

    key = "user:opp:" + str(memberId)
    json_value = revese_sim_meeting.to_json(orient='records', force_ascii=False, indent=4)
    rd.set(key, json_value)
    response = dict()
    response['oppositeMeetings'] = json.loads(revese_sim_meeting.to_json(orient='records', force_ascii=False, indent=4))
    return response

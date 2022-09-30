import pandas as pd
import json
import time
import crud

def reverse_meeting_data(book):
    # 게시글 데이터가 없으니 임의로 생성
    # 필요 컬럼 - id, title, book_id, users(id정보), 모임의 종류(다 읽은 책 => 1, 읽을 책 => 2)
    # memberId 4가 읽은 책(5572819, 5795911. 1323591)으로 만든 모임
    titles = []
    covers = []
    maxCapacity = []
    for bookid in [2431928, 1072294, 2396943, 1006570, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728]:
        # titles.append(list(book[book.index == bookid]['title'].values).pop())
        # covers.append(list(book[book.index == bookid]['cover'].values).pop())
        # print(book[book.index == bookid])
        maxCapacity.append(6)

    meeting = pd.DataFrame({'meetingId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        'bookId': [5360154, 5367433, 5359868, 5411690, 2155671, 1323591, 2396986, 2376187, 2037399, 2083728],
                        # 'bookTitle': titles,
                        # 'cover': covers,
                        'meetingtTitle': ['완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분', 
                                '완독을 위해 같이 책 읽을 분', '읽은 책에 대한 얘기 나누실 분'],
                        'currenMember': [[42, 10], [35], [40, 26], [42, 32], [62, 9], [25, 39, 51], [47, 12], [21, 37], [57], [16, 48]],
                        'maxCapacity':maxCapacity,
                        'meetingCategory':[2, 1, 2, 1, 2, 1, 2, 1, 2, 1]
                        })
    return meeting

    # 반대 유사도 책 데이터 반환
def find_reverse_sim_book(df, sorted_ind, book_id, top_n=100):

    book_id_book = df[df['id'] == book_id] # 입력된 book_id 행 저장
    book_id_index = book_id_book.index.values # 입력된 book_id index저장
    
    # top_n의 2배에 해당하는 장르 유사성이 높은 인덱스 추출
    # book_index로 유사도 높은 40개 추출
    sim_indexes = sorted_ind[book_id_index, :(top_n*2)] # sorted_ind는 유사도 행렬임

    # 접근하기 편하게 2차원 행렬 1차원으로 변형
    sim_indexes = sim_indexes.reshape(-1)
    
    # 기준 책(입력된 book_id) 인덱스 제외
    sim_indexes = sim_indexes[sim_indexes != book_id_index]
   
    # top_n의 2배에 해당하는 후보군에서 w_rating이 높은 순으로 top_n만큼 추출
    # iloc은 데이터프레임 조회할 때 쓰는 메서드(loc, iloc)
    return df.iloc[sim_indexes].sort_values('w_rating', ascending=False)[:top_n]

# 반대 유사도 책 기반 모임 추천 반환
def opposite_meeting(memberId, booklog, review, meeting, df):
    cat_sim_resorted_ind = crud.count_sim(df)
    user_book = crud.get_user_read(memberId, booklog, review)

    # 빈 데이터 프레임 컬럼만 지정해서 만들고
    result = pd.DataFrame(columns = ['id', 'isbn', 'title', 'author', 'publish_date', 'description', 'cover', 
                                'category_id', 'publisher', 'page', 'rating_score', 'rating_count', 'w_rating', 'cid', 'keywords'])


    # 읽은 책 리스트의 평점 상위 5개를 하나씩 접근해서
    for book_id in user_book:

        # book_id로 비슷한 책 찾아서
        resim_books = find_reverse_sim_book(df, cat_sim_resorted_ind[:, ::-1], book_id, 1000)
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
        if bookid in list(meeting['bookId']):

            revese_sim_meeting = pd.concat([revese_sim_meeting , meeting[meeting['bookId'] == bookid]])

    response = dict()
    response['oppositeMeeting'] = json.loads(revese_sim_meeting.to_json(orient='records', force_ascii=False, indent=4))
    return response
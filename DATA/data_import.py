import pymysql
import requests
import json
from datetime import datetime
import time
import logging

#   db 연결
def dbconnect():
    conn = pymysql.connect (host='chaekin.cvg3ycl5pbuo.ap-northeast-2.rds.amazonaws.com', user='admin', password='chrlghk1!', db='testdb', charset='utf8')
    return conn

'''
book_isbn_TB 정보 가져오는 함수.
새로 추가되는 정보는 check가 null임.
'''
def search_data(conn):
    cur = conn.cursor()
    sql = "SELECT * FROM book_isbn where `check` is null"
    cur.execute(sql)
    results = cur.fetchall()
    return results

'''
(사용x)
category_TB 정보 가져오는 함수
중복 값 조회 최적화를 위해 process 시작시 처음 한 번 가져옴
'''
def get_category_all(conn):
    cur = conn.cursor()
    sql = "SELECT * FROM category"
    cur.execute(sql)
    results = cur.fetchall()
    return results

'''
(사용x)
category_TB에서 cid와 id를 딕셔너리로 만들어 반환 
(key, cid) : (value : id)
'''
def get_category_dict(conn):
    #   db에서 카테고리 정보 가져오기
    category = get_category_all(conn)
    # print(category)

    #   카테고리 정보를 딕셔너리로 만들기 
    #   (key, cid) : (value, id)
    dict_category = {}
    for item in category:
        dict_category[item[1]] = item[0]
    
    return dict_category


'''
category_TB에서 cid에 해당하는 row의 id를 가져옴
'''
def find_category_id(conn, cid):
    cur = conn.cursor()
    sql = "SELECT id FROM category WHERE cid = %s"
    cur.execute(sql, cid)
    result = cur.fetchall()
    return result

'''
category_TB에서 cid에 해당하는 row의 id 갯수를 반환
'''
def find_category_id_num(conn, cid):
    cur = conn.cursor()
    sql = "SELECT COUNT(id) FROM category WHERE cid = %s"
    cur.execute(sql, cid)
    result = cur.fetchone()
    return result[0]

'''
(사용x)
딕셔너리 형태로 결과반환, 0.10911 sec
'''
def get_category2(conn):
    cur = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM category"
    cur.execute(sql)
    results = cur.fetchall()
    return results


'''
api 요청 결과가 정상 응답인지 확인
'''
def is_error(res):
    # print(res)
    try:
        #   isbn으로 알라딘 api 조회시 상품이 없는 경우
        #   응답 전문으로 errorCode가 날라옴
        #   error임
        error_code = res['errorCode']
        return True
    except:
        #   errorCode가 존재하지 않으므로 사용 가능
        return False

def process(conn, logger):
    list = search_data(conn)

    # start = time.time()
    # get_category2(conn)
    # end = time.time()
    
    #dict_category = {}
    #dict_category = get_category_dict(conn)

    #print(dict_category)

    #   요청 api 주소
    API_HEAD = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey='
    
    #   api key
    API_KEYS = [['ttbkit38631200001', 4000, '인태'],['ttbbeckhem961036001', 4000, '희영'],['ttbgmldud03231035001', 4000, '완택']]
    
    API_BODY = '&itemIdType=ISBN13&ItemId='
    
    API_TAIL = '&output=JS&Version=20131101&OptResult=ratingInfo'

    #   요청 결과(카테고리) 파싱한 것을 담을 리스트
    #insert_category_value_list = []

    # for item in list:
    #     print(item[1])
    # print(len(list))

    key_index = 0
    for item in list:
        book_id = item[0]
        isbn = item[1]
        # print(f'id: {item[0]}, isbn: {item[1]} 작업 시작')
        # logger.info(f'id: {item[0]}, isbn: {item[1]} 작업 시작')
        logger.info("id: %s, isbn: %s 작업 시작" % (item[0], item[1]))

        url = ""
        #   api 호출한도를 넘지 않았으면 계속 호출
        if key_index < len(API_KEYS) and API_KEYS[key_index][1] != 0 :
            url = API_HEAD + API_KEYS[key_index][0] + API_BODY + item[1] + API_TAIL
            #   api 호출
            res = requests.get(url)
            logger.info("소유자: %s, 현재 수행 키: %s, 남은 횟수: %s" % (API_KEYS[key_index][2], API_KEYS[key_index][0], API_KEYS[key_index][1]))
            
            #   error code 존재 시 다음 item 조사
            try:
                param = res.json()
                if is_error(param):
                    update_book_isbn_no_item(conn, isbn, logger)
                    API_KEYS[key_index][1] -= 1
                    continue
            except:
                update_book_isbn_has_err(conn, isbn, logger)
                API_KEYS[key_index][1] -= 1
                continue

            #   api 요청 중 카테고리 정보 파싱
            parsing_category_result = parsing_category_json(res.json())
            
            # parsing_category_result가 None면 eBook인 경우
            if parsing_category_result is None:
                update_book_isbn_has_err(conn, isbn, logger)
                API_KEYS[key_index][1] -= 1
                continue

            category_cid = parsing_category_result[0]

            parsing_book_result = []

            #   categoryId가 0이면 categoryName이 존재 x
            if category_cid != 0:
                #   api 호출 결과의 cid가 category_TB에 존재하면 pass
                category_n = find_category_id_num(conn, category_cid)
                if category_n > 0:
                    pass
                else:
                    #   없으면 category_TB에 parsing 결과 추가
                    insert_category_one(conn, tuple(parsing_category_result), logger)
                
                #   category_TB에 새로 생성된 id 가져옴
                new_category_id = find_category_id(conn, category_cid)

                #   api 요청 중 책 정보 파싱, 새로 생성된 category_id 같이 전달
                parsing_book_result = parsing_book_json(res.json(), new_category_id)
            else:
                parsing_book_result = parsing_book_json(res.json(), None)

            
            #   isbn 추가
            parsing_book_result.insert(0, isbn)
            #   master_seq 추가
            parsing_book_result.insert(0, book_id)
            

            #   book_TB에 값 넣기
            insert_book_one(conn, tuple(parsing_book_result), logger)

            #   book_isbn 업데이트
            update_book_isbn(conn, isbn, logger)

            #   호출 한도 1 감소
            API_KEYS[key_index][1] -= 1
            #   호출 완료 및 DB 갱신 완료
            # print(f'현재 수행 키: {API_KEYS[key_index][0]}, 남은 횟수: {API_KEYS[key_index][1]}')
            # print("------------------------------------------------")
            # logger.info(f'현재 수행 키: {API_KEYS[key_index][0]}, 남은 횟수: {API_KEYS[key_index][1]}')
            logger.info("id: %s, isbn: %s 작업 완료" % (item[0], item[1]))
            logger.info("------------------------------------------------")

        elif key_index >= len(API_KEYS):
            break
        else:
            key_index += 1


'''
api 요청 결과중 book_TB에 넣을 정보만 parsing해서 return :list
'''
def parsing_book_json(data, category_id):
    value = []
    # print(data)
    item = data['item'][0]

    value.append(item['title'])
    value.append(item['author'])
    value.append(item['pubDate'])
    value.append(item['description'])
    value.append(item['cover'].replace("coversum", "cover"))
    value.append(category_id)
    value.append(item['publisher'])
    
    try:
        subInfo = item['subInfo']
    except:
        value.extend([0,0,0])
        return value

    try:
        value.append(subInfo['itemPage'])
    except:
        value.append(0)

    try:
        #   간혹 ratingInfo가 존재하지 않는 아이템이 있음
        ratingInfo = subInfo['ratingInfo']
        value.append(ratingInfo['ratingScore']/ 2)
        value.append(ratingInfo['ratingCount'])
    except:
        #   그 경우 item 0
        value.append(0)
        value.append(0)
    
    # print(tuple(value))
    return value


'''
api 요청 결과중 category_TB에 넣을 정보만 parsing해서 return :list
'''
def parsing_category_json(data):
    value = []

    category_id = data['item'][0]['categoryId']
    category_list = data['item'][0]['categoryName'].split('>')
    
    value.append(category_id)

    # category name이 eBook인 경우 제외
    if len(category_list[0]) > 4:
        return None
    
    if len(category_list) > 3:
        last_element = category_list[len(category_list)-1]

        # print(type(category_id), category_id)
        value.append(last_element)
        value.extend(category_list)
    else:
        value.extend(['','',''])

    return value


'''
category_TB에 카테고리 insert 하나씩
'''
def insert_category_one(conn, item, logger):
    cur = conn.cursor()
    #   len : 4(0), 5(1), 6(2), 7(3), 8(4)
    sql_list = ([ "INSERT INTO category (cid, name, mall, depth1) VALUES (%s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2) VALUES (%s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3) VALUES (%s, %s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3, depth4) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3, depth4, depth5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    ])

    length = len(item)
    cur.execute(sql_list[length-4], item)
    conn.commit()
    # print(f'category_TB cid: {item[0]} 추가 성공')
    # logger.info(f'category_TB cid: {item[0]} 추가 성공')
    logger.info("category_TB cid: %s 추가 성공" % item[0])

'''
(사용x)category_TB에 카테고리 insert 한번에
'''
def insert_category(conn, list):
    cursor = conn.cursor()
    #   len : 4(0), 5(1), 6(2), 7(3), 8(4)
    sql_list = ([ "INSERT INTO category (cid, name, mall, depth1) VALUES (%s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2) VALUES (%s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3) VALUES (%s, %s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3, depth4) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        "INSERT INTO category (cid, name, mall, depth1, depth2, depth3, depth4, depth5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    ])
    # print(sql_list)
    # print(list)
    # print(len(list[0]))


    frame = [[], [], [], [], []]
    for item in list:
        print(item)
        if len(item) == 4:
            frame[0].append(item)
        elif len(item) == 5:
            frame[1].append(item)
        elif len(item) == 6:
            frame[2].append(item)
        elif len(item) == 7:
            frame[3].append(item)
        elif len(item) == 8:
            frame[4].append(item)
        
    # print(frame)

    for sql, values in zip(sql_list, frame):
        # print(sql, values)
        cursor.executemany(sql, values)
    
    conn.commit()



'''
book_TB에 book insert
'''
def insert_book_one(conn, item, logger):
    cursor = conn.cursor()

    # print(list)
    # print(list[0][-5])
    sql = "INSERT INTO book VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cursor.execute(sql, item)
    conn.commit()
    # print(f'book_TB id: {item[0]}, isbn: {item[1]} 추가 성공')
    # logger.info(f'book_TB id: {item[0]}, isbn: {item[1]} 추가 성공')
    logger.info("book_TB id: %s, isbn: %s 추가 성공" % (item[0], item[1]))


'''
(사용x) book_TB에 book list insert
'''
def insert_book_many(conn, list):
    cursor = conn.cursor()

    # print(list)
    # print(list[0][-5])
    sql = "INSERT INTO book VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    
    cursor.executemany(sql, list)
    conn.commit()


'''
book_isbn_TB의 check 값 update
'''
def update_book_isbn(conn, item, logger):
    cursor = conn.cursor()
    sql = "UPDATE book_isbn set `check` = TRUE, has_item = TRUE where isbn = %s"
    cursor.execute(sql, item)
    conn.commit()
    # print(f'book_isbn isbn={item} 업데이트 성공')
    # logger.info(f'book_isbn isbn={item} 업데이트 성공')
    logger.info("book_isbn isbn=%s 업데이트 성공" % item)

'''
book_isbn_TB의 check 값 update
'''
def update_book_isbn_no_item(conn, item, logger):
    cursor = conn.cursor()
    sql = "UPDATE book_isbn set `check` = TRUE, has_item = FALSE where isbn = %s"
    cursor.execute(sql, item)
    conn.commit()
    # print(f'book_isbn isbn={item} 업데이트 성공')
    # logger.info(f'book_isbn_no_item isbn={item} 업데이트 성공')
    logger.info("book_isbn_no_item isbn=%s 업데이트 성공" % item)

'''
book_isbn_TB의 check 값, has_err update
'''
def update_book_isbn_has_err(conn, item, logger):
    cursor = conn.cursor()
    sql = "UPDATE book_isbn set `check` = TRUE, has_err = FALSE where isbn = %s"
    cursor.execute(sql, item)
    conn.commit()
    # print(f'book_isbn isbn={item} 업데이트 성공')
    # logger.info(f'book_isbn_no_item isbn={item} 업데이트 성공')
    logger.info("book_isbn_has_err isbn=%s 업데이트 성공" % item)

'''
(사용x) book_isbn_TB의 check 값 update, 한 번에 여러개
'''
def update_book_isbn_many(conn, list):
    cursor = conn.cursor()

    print(list)

    sql = "UPDATE book_isbn set `check` = TRUE where isbn = %s"
    cursor.executemany(sql, list)
    conn.commit()

    

def main():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    # Formatter 생성
    formatter = logging.Formatter('%(name)s - %(levelname)s - %(asctime)s - %(message)s')

    # filehandler와 streamhandler 생성    
    filehandler = logging.FileHandler('C:\\Users\\SSAFY\\log\\_{:%Y%m%d}.log'.format(datetime.now()), encoding='utf-8')

    streamhandler = logging.StreamHandler()

    # Handler에 formatter 세팅
    filehandler.setFormatter(formatter)

    # Handler를 Logger에 추가합니다.
    logger.addHandler(filehandler)
    logger.addHandler(streamhandler)

    conn = dbconnect()  #   DB 연결
    # print('연결완료')
    logger.info("연결완료")

    process(conn, logger)

    conn.close()        #   DB 연결 끊기
    # print('연결해제')
    logger.info("연결해제")


if __name__=="__main__":
    main()
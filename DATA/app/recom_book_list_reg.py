import asyncio
import requests
import crud


def recomm_book_list_reg():
    member = crud.get_member_id()
    print(member)
    for id in member.index:
        url = f'http://127.0.0.1:8000/api/data/books/cbf/{id}'
        print(url)
        response = requests.get(url)
        print(response)

def recomm_opp_book_list_reg():
    member = crud.get_member_id()
    length = len(member.index)
    print(length)
    for id in member.index:
        length = length - 1
        url = f'http://127.0.0.1:8000/api/data/meeting/opposite/{id}'
        response = requests.get(url)
        print(length, url, response)

def main():
    # recomm_book_list_reg()
    recomm_opp_book_list_reg()

if __name__=="__main__":
    main()
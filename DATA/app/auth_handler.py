import time
from typing import Dict

import jwt
# from jose import jwt
from decouple import config

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

# JWT_SECRET = "8dfd920afd604a76a313be5eab6c7a5"
# JWT_ALGORITHM = "HS256"

def token_response(token: str):
    return {
        "access_token": token
    }

def decodeJWT(token: str) -> dict:
    print(JWT_SECRET)
    print(JWT_ALGORITHM)
    print(type(JWT_SECRET), type(JWT_ALGORITHM))
    print("token: ", token)
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, [JWT_ALGORITHM])
        print("decoded_code: ", decoded_code)
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except:
        return {}
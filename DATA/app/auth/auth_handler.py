import time
from typing import Dict

import jwt
from decouple import config
# import os
# from dotenv import load_dotenv

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")


# JWT_SECRET = os.getenv("screte")
# JWT_ALGORITHM = os.getenv("algorithm")


def token_response(token: str):
    return {
        "access_token": token
    }

def decodeJWT(token: str) -> dict:
    try:
        # print(type(JWT_SECRET), JWT_SECRET)
        # print(type(JWT_ALGORITHM), JWT_ALGORITHM)
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        # print(decoded_token)
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except:
        return {}
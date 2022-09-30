from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .auth_handler import *

from sqlalchemy.orm import Session
import models, schemas
from database import engine

import pandas as pd


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            if not self.verify_member_id(credentials.credentials):
                raise HTTPException(status_code=403 , detail="Invalid authentication member")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = decodeJWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid

    def verify_member_id(self, jwtoken: str):
        isMemberIdValid: bool = False
        try:
            payload = decodeJWT(jwtoken)
            # print(member_id)
        except:
            payload = {}
        
        payload_member_id = payload['id']
        query = "select count(*) from member where id = {}".format(payload_member_id)
        member_id = pd.read_sql(query, engine).iat[0,0]

        if member_id == 1:
            isMemberIdValid = True

        return isMemberIdValid
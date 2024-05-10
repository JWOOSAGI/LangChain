from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Request(BaseModel):
    question: str

class Response(BaseModel):
    answer: str

@router.post('/titanic')
async def titanic(req: Request):
    print('titanic 딕셔너리 내용')
    print(req)
    return {"생존자는 100명이야"}
from fastapi import APIRouter
from pydantic import BaseModel

from app.api.titanic.service.titanic_service import TitanicService

router = APIRouter()
service = TitanicService()

class Request(BaseModel):
    question: str

class Response(BaseModel):
    answer: str

@router.post('/titanic')
async def titanic(req: Request):
    print('titanic 딕셔너리 내용')
    hello = 'C:\\Users\\bitcamp\\IdeaProjects\\chat-server\\backend\\app\\api\\titanic\\data\\hello.txt'
    f = open(hello, 'r', encoding='utf-8')
    data = f.read()
    print(data)
    f.close()
    service.process()
    print(req)
    return {"생존자는 100명이야"}
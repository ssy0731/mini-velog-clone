from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PostCreate(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    tags: Optional[str] = None

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    summary: Optional[str] = None
    tags: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    # SQLAlchemy 모델 객체를 Pydantic 응답으로 변환할 수 있게 해주는 설정
    class Config:
        from_attributes = True

class PostUpdate(BaseModel):
    title: str
    content: str
    summary: Optional[str] = None
    tags: Optional[str] = None

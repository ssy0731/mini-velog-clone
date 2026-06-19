from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import or_
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models
import schemas

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "FastAPI 서버가 실행 중입니다."}

# 게시글 가져오기 (검색이랑 태그 기능까지 구현 완료)
@app.get("/posts", response_model=list[schemas.PostResponse])
def get_posts(
    search: str | None = None,
    tag: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Post)

    if search:
        query = query.filter(
            or_(
                models.Post.title.contains(search),
                models.Post.content.contains(search)
            )
        )
    if tag:
        query = query.filter(
            models.Post.tags.contains(tag)
        )
    query = query.order_by(models.Post.id.desc())
              
    posts = query.all()

    return posts

@app.get("/posts/{post_id}", response_model=schemas.PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()

    if post is None:
        raise HTTPException(status_code=404, detail="게시글을 찾을 수 없습니다.")
    
    return post

@app.post("/posts", response_model=schemas.PostResponse)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(
        title=post.title,
        content=post.content,
        summary=post.summary,
        tags=post.tags,
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post

@app.put("/posts/{post_id}", response_model=schemas.PostResponse)
def update_post(
    post_id: int,
    post_data: schemas.PostUpdate,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()

    if post is None:
        raise HTTPException(
            status_code=404,
            detail='게시글을 찾을 수 없습니다.'
        )
    
    post.title = post_data.title
    post.content = post_data.content
    post.summary = post_data.summary
    post.tags = post_data.tags

    db.commit()
    db.refresh(post)

    return post

@app.delete("/posts/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()

    if post is None:
        raise HTTPException(
            status_code=404,
            detail="게시글을 찾을 수 없습니다."
        )
    
    db.delete(post)
    db.commit()

    return {"message": "게시글이 삭제되었습니다."}
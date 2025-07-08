from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas.blog import BlogCreate, BlogOut, BlogCategoryCreate, BlogCategoryOut
from service.blog_service import create_blog, get_blog, get_blogs, update_blog, delete_blog, create_category
from utils.db import get_db
from models.user import User
from service.auth_service import has_permission
from routes.auth import require_permission
import uuid
import os

router = APIRouter(prefix="/blogs", tags=["Blogs"])

# Image upload endpoint (reuse from services)
@router.post("/upload-image")
async def upload_blog_image(
    file: UploadFile = File(...),
    current_user: User = Depends(require_permission("manage_blogs"))
):
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    
    # Save file
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    return {"url": f"/{file_path}"}

# Blog CRUD endpoints
@router.post("/", response_model=BlogOut)
def create_new_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_blogs"))
):
    return create_blog(db, blog, current_user.id)

@router.get("/", response_model=list[BlogOut])
def list_blogs(db: Session = Depends(get_db)):
    return get_blogs(db)

@router.get("/{blog_id}", response_model=BlogOut)
def get_blog_by_id(blog_id: int, db: Session = Depends(get_db)):
    blog = get_blog(db, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

@router.put("/{blog_id}", response_model=BlogOut)
def update_existing_blog(
    blog_id: int,
    blog: BlogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_blogs"))
):
    return update_blog(db, blog_id, blog)

@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_blogs"))
):
    delete_blog(db, blog_id)
    return

# Category management
@router.post("/categories", response_model=BlogCategoryOut)
def create_blog_category(
    category: BlogCategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_blogs"))
):
    return create_category(db, category)

@router.get("/categories", response_model=list[BlogCategoryOut])
def list_blog_categories(db: Session = Depends(get_db)):
    return get_categories(db)
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas.testimonial import TestimonialCreate, TestimonialOut
from service.testimonial_service import (
    create_testimonial, 
    get_testimonial, 
    get_testimonials, 
    update_testimonial, 
    delete_testimonial
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission
import uuid
import os
from typing import List

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.post("/upload-image")
async def upload_testimonial_image(
    file: UploadFile = File(...),
    current_user: User = Depends(require_permission("manage_testimonials"))
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

@router.post("/", response_model=TestimonialOut)
def create_new_testimonial(
    testimonial: TestimonialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_testimonials"))
):
    return create_testimonial(db, testimonial)

@router.get("/", response_model=List[TestimonialOut])
def list_testimonials(db: Session = Depends(get_db)):
    return get_testimonials(db)

@router.get("/{testimonial_id}", response_model=TestimonialOut)
def get_testimonial_by_id(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = get_testimonial(db, testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial

@router.put("/{testimonial_id}", response_model=TestimonialOut)
def update_existing_testimonial(
    testimonial_id: int,
    testimonial: TestimonialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_testimonials"))
):
    return update_testimonial(db, testimonial_id, testimonial)

@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_testimonials"))
):
    delete_testimonial(db, testimonial_id)
    return
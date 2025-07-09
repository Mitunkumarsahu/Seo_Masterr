from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.social_media import SocialMediaCreate, SocialMediaOut
from service.social_media_service import (
    create_social_media,
    get_social_media,
    get_all_social_media,
    update_social_media,
    delete_social_media
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission
from typing import List

router = APIRouter(prefix="/social-media", tags=["Social Media"])

@router.post("/", response_model=SocialMediaOut)
def create_new_social_link(
    social_media: SocialMediaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_social_media"))
):
    return create_social_media(db, social_media)

@router.get("/", response_model=List[SocialMediaOut])
def list_all_social_links(db: Session = Depends(get_db)):
    return get_all_social_media(db)

@router.get("/{social_id}", response_model=SocialMediaOut)
def get_social_link(social_id: int, db: Session = Depends(get_db)):
    social = get_social_media(db, social_id)
    if not social:
        raise HTTPException(status_code=404, detail="Social media link not found")
    return social

@router.put("/{social_id}", response_model=SocialMediaOut)
def update_social_link(
    social_id: int,
    social_media: SocialMediaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_social_media"))
):
    return update_social_media(db, social_id, social_media)

@router.delete("/{social_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_social_link(
    social_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_social_media"))
):
    delete_social_media(db, social_id)
    return
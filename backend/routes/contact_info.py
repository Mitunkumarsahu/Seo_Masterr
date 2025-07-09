from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.contact_info import ContactInfoCreate, ContactInfoOut
from service.contact_info_service import (
    create_contact_info,
    get_contact_info,
    get_all_contact_info,
    get_active_contact_info,
    update_contact_info,
    delete_contact_info
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/contact-info", tags=["Contact Information"])

@router.post("/", response_model=ContactInfoOut)
def create_info(
    info: ContactInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_info"))
):
    return create_contact_info(db, info)

@router.get("/", response_model=list[ContactInfoOut])
def list_info(db: Session = Depends(get_db)):
    return get_all_contact_info(db)

@router.get("/active", response_model=ContactInfoOut)
def get_active_info(db: Session = Depends(get_db)):
    info = get_active_contact_info(db)
    if not info:
        raise HTTPException(status_code=404, detail="No active contact info found")
    return info

@router.get("/{info_id}", response_model=ContactInfoOut)
def get_info_by_id(info_id: int, db: Session = Depends(get_db)):
    info = get_contact_info(db, info_id)
    if not info:
        raise HTTPException(status_code=404, detail="Contact info not found")
    return info

@router.put("/{info_id}", response_model=ContactInfoOut)
def update_info(
    info_id: int,
    info: ContactInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_info"))
):
    updated = update_contact_info(db, info_id, info)
    if not updated:
        raise HTTPException(status_code=404, detail="Contact info not found")
    return updated

@router.delete("/{info_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_info(
    info_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_info"))
):
    if not delete_contact_info(db, info_id):
        raise HTTPException(status_code=404, detail="Contact info not found")
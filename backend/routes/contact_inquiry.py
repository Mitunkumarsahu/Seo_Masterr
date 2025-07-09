from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from schemas.contact_inquiry import ContactInquiryCreate, ContactInquiryOut
from service.contact_inquiry_service import (
    create_contact_inquiry,
    get_contact_inquiry,
    get_all_contact_inquiries,
    mark_as_read,
    delete_contact_inquiry
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/contact-inquiries", tags=["Contact Inquiries"])

# Public endpoint for submitting inquiries
@router.post("/", response_model=ContactInquiryOut, status_code=status.HTTP_201_CREATED)
def submit_inquiry(
    inquiry: ContactInquiryCreate,
    db: Session = Depends(get_db)
):
    return create_contact_inquiry(db, inquiry)

# Admin-only endpoints
@router.get("/", response_model=list[ContactInquiryOut])
def list_inquiries(
    read_status: str = Query("all", description="Filter by read status: all, read, unread"),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_inquiries"))
):
    return get_all_contact_inquiries(db, read_status)

@router.patch("/{inquiry_id}/read", response_model=ContactInquiryOut)
def mark_inquiry_as_read(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_inquiries"))
):
    inquiry = mark_as_read(db, inquiry_id)
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return inquiry

@router.delete("/{inquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_inquiries"))
):
    if not delete_contact_inquiry(db, inquiry_id):
        raise HTTPException(status_code=404, detail="Inquiry not found")
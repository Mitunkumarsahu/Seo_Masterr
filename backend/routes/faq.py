from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.faq import FAQCreate, FAQOut
from service.faq_service import create_faq, get_faq, get_faqs, update_faq, delete_faq
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/faqs", tags=["FAQs"])

@router.post("/", response_model=FAQOut)
def create_new_faq(
    faq: FAQCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_faqs"))
):
    return create_faq(db, faq)

@router.get("/", response_model=list[FAQOut])
def list_faqs(active_only: bool = False, db: Session = Depends(get_db)):
    return get_faqs(db, active_only)

@router.get("/{faq_id}", response_model=FAQOut)
def get_faq_by_id(faq_id: int, db: Session = Depends(get_db)):
    faq = get_faq(db, faq_id)
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

@router.put("/{faq_id}", response_model=FAQOut)
def update_existing_faq(
    faq_id: int,
    faq: FAQCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_faqs"))
):
    updated = update_faq(db, faq_id, faq)
    if not updated:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return updated

@router.delete("/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_faq(
    faq_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_faqs"))
):
    if not delete_faq(db, faq_id):
        raise HTTPException(status_code=404, detail="FAQ not found")
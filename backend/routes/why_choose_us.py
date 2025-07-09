from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.why_choose_us import WhyChooseUsCreate, WhyChooseUsOut
from service.why_choose_us_service import (
    create_why_choose_us,
    get_why_choose_us,
    get_all_why_choose_us,
    get_active_why_choose_us,
    update_why_choose_us,
    delete_why_choose_us
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/why-choose-us", tags=["Why Choose Us"])

@router.post("/", response_model=WhyChooseUsOut)
def create_section(
    section: WhyChooseUsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_why_choose_us"))
):
    return create_why_choose_us(db, section)

@router.get("/", response_model=list[WhyChooseUsOut])
def list_sections(db: Session = Depends(get_db)):
    return get_all_why_choose_us(db)

@router.get("/active", response_model=WhyChooseUsOut)
def get_active_section(db: Session = Depends(get_db)):
    section = get_active_why_choose_us(db)
    if not section:
        raise HTTPException(status_code=404, detail="No active section found")
    return section

@router.put("/{section_id}", response_model=WhyChooseUsOut)
def update_section(
    section_id: int,
    section: WhyChooseUsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_why_choose_us"))
):
    updated = update_why_choose_us(db, section_id, section)
    if not updated:
        raise HTTPException(status_code=404, detail="Section not found")
    return updated

@router.delete("/{section_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_section(
    section_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_why_choose_us"))
):
    delete_why_choose_us(db, section_id)
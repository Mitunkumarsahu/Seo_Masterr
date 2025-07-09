from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.contact_hero import ContactHeroCreate, ContactHeroOut
from service.contact_hero_service import (
    create_contact_hero,
    get_contact_hero,
    get_all_contact_heroes,
    update_contact_hero,
    delete_contact_hero,
    get_active_contact_hero
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/contact-hero", tags=["Contact Page Hero"])

@router.post("/", response_model=ContactHeroOut)
def create_hero(
    hero: ContactHeroCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_hero"))
):
    return create_contact_hero(db, hero)

@router.get("/", response_model=list[ContactHeroOut])
def list_heroes(active_only: bool = False, db: Session = Depends(get_db)):
    return get_all_contact_heroes(db, active_only)

@router.get("/active", response_model=ContactHeroOut)
def get_active_hero(db: Session = Depends(get_db)):
    hero = get_active_contact_hero(db)
    if not hero:
        raise HTTPException(status_code=404, detail="No active hero found")
    return hero

@router.get("/{hero_id}", response_model=ContactHeroOut)
def get_hero_by_id(hero_id: int, db: Session = Depends(get_db)):
    hero = get_contact_hero(db, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero

@router.put("/{hero_id}", response_model=ContactHeroOut)
def update_hero(
    hero_id: int,
    hero: ContactHeroCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_hero"))
):
    updated = update_contact_hero(db, hero_id, hero)
    if not updated:
        raise HTTPException(status_code=404, detail="Hero not found")
    return updated

@router.delete("/{hero_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hero(
    hero_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_contact_hero"))
):
    if not delete_contact_hero(db, hero_id):
        raise HTTPException(status_code=404, detail="Hero not found")
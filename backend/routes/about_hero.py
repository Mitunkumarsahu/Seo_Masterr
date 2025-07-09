from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.about_hero import AboutHeroCreate, AboutHeroOut
from service.about_hero_service import (
    create_about_hero,
    get_about_hero,
    get_all_about_heroes,
    update_about_hero,
    delete_about_hero,
    get_active_about_hero
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/about-hero", tags=["About Page Hero"])

@router.post("/", response_model=AboutHeroOut)
def create_hero(
    hero: AboutHeroCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_about_hero"))
):
    return create_about_hero(db, hero)

@router.get("/", response_model=list[AboutHeroOut])
def list_heroes(active_only: bool = False, db: Session = Depends(get_db)):
    return get_all_about_heroes(db, active_only)

@router.get("/active", response_model=AboutHeroOut)
def get_active_hero(db: Session = Depends(get_db)):
    hero = get_active_about_hero(db)
    if not hero:
        raise HTTPException(status_code=404, detail="No active hero found")
    return hero

@router.get("/{hero_id}", response_model=AboutHeroOut)
def get_hero_by_id(hero_id: int, db: Session = Depends(get_db)):
    hero = get_about_hero(db, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero

@router.put("/{hero_id}", response_model=AboutHeroOut)
def update_hero(
    hero_id: int,
    hero: AboutHeroCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_about_hero"))
):
    updated = update_about_hero(db, hero_id, hero)
    if not updated:
        raise HTTPException(status_code=404, detail="Hero not found")
    return updated

@router.delete("/{hero_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hero(
    hero_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_about_hero"))
):
    if not delete_about_hero(db, hero_id):
        raise HTTPException(status_code=404, detail="Hero not found")
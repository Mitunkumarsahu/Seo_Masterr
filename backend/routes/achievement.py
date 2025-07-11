from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.achievement import AchievementCreate, AchievementOut
from service.achievement_service import (
    create_achievement,
    get_achievement,
    get_all_achievements,
    update_achievement,
    delete_achievement
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/achievements", tags=["Achievements"])

@router.post("/", response_model=AchievementOut, status_code=status.HTTP_201_CREATED)
def create_new_achievement(
    achievement: AchievementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_achievements"))
):
    return create_achievement(db, achievement)

@router.get("/", response_model=list[AchievementOut])
def list_achievements(
    db: Session = Depends(get_db)
):
    return get_all_achievements(db)

@router.get("/{achievement_id}", response_model=AchievementOut)
def get_achievement_by_id(
    achievement_id: int,
    db: Session = Depends(get_db)
):
    achievement = get_achievement(db, achievement_id)
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

@router.put("/{achievement_id}", response_model=AchievementOut)
def update_existing_achievement(
    achievement_id: int,
    achievement: AchievementCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_achievements"))
):
    updated = update_achievement(db, achievement_id, achievement)
    if not updated:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return updated

@router.delete("/{achievement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_achievement(    
    achievement_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_achievements"))
):
    if not delete_achievement(db, achievement_id):
        raise HTTPException(status_code=404, detail="Achievement not found")
    return {"detail": "Achievement deleted successfully"}


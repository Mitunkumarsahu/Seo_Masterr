from sqlalchemy.orm import Session
from models.achievement import Achievement  
from schemas.achievement import AchievementCreate, AchievementOut
from utils.db import get_db
from fastapi import HTTPException
from typing import List

def create_achievement(db: Session, achievement: AchievementCreate) -> AchievementOut:
    db_achievement = Achievement(**achievement.dict())
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    return AchievementOut.from_orm(db_achievement)

def get_achievement(db: Session, achievement_id: int) -> AchievementOut:
    db_achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not db_achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return AchievementOut.from_orm(db_achievement)

def get_all_achievements(db: Session) -> List[AchievementOut]:
    db_achievements = db.query(Achievement).all()
    return [AchievementOut.from_orm(achievement) for achievement in db_achievements]

def update_achievement(db: Session, achievement_id: int, achievement: AchievementCreate) -> AchievementOut:
    db_achievement = get_achievement(db, achievement_id)
    for key, value in achievement.dict().items():
        setattr(db_achievement, key, value)
    
    db.commit()
    db.refresh(db_achievement)
    return AchievementOut.from_orm(db_achievement)

def delete_achievement(db: Session, achievement_id: int) -> bool:
    db_achievement = get_achievement(db, achievement_id)
    if db_achievement:
        db.delete(db_achievement)
        db.commit()
        return True
    return False


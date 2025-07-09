from sqlalchemy.orm import Session
from models.social_media import SocialMedia, SocialPlatform
from schemas.social_media import SocialMediaCreate

def create_social_media(db: Session, social_media: SocialMediaCreate):
    db_social = SocialMedia(**social_media.model_dump())
    db.add(db_social)
    db.commit()
    db.refresh(db_social)
    return db_social

def get_social_media(db: Session, social_id: int):
    return db.query(SocialMedia).filter(SocialMedia.id == social_id).first()

def get_all_social_media(db: Session):
    return db.query(SocialMedia).order_by(SocialMedia.order).all()

def update_social_media(db: Session, social_id: int, social_media: SocialMediaCreate):
    db_social = get_social_media(db, social_id)
    if not db_social:
        return None
    
    for key, value in social_media.model_dump().items():
        setattr(db_social, key, value)
    
    db.commit()
    db.refresh(db_social)
    return db_social

def delete_social_media(db: Session, social_id: int):
    db_social = get_social_media(db, social_id)
    if db_social:
        db.delete(db_social)
        db.commit()
from sqlalchemy.orm import Session
from models.about_hero import AboutHero
from schemas.about_hero import AboutHeroCreate

def create_about_hero(db: Session, hero: AboutHeroCreate):
    db_hero = AboutHero(**hero.dict())
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero

def get_about_hero(db: Session, hero_id: int):
    return db.query(AboutHero).filter(AboutHero.id == hero_id).first()

def get_all_about_heroes(db: Session, active_only: bool = False):
    query = db.query(AboutHero)
    if active_only:
        query = query.filter(AboutHero.is_active == True)
    return query.all()

def update_about_hero(db: Session, hero_id: int, hero: AboutHeroCreate):
    db_hero = get_about_hero(db, hero_id)
    if not db_hero:
        return None
    
    for key, value in hero.dict().items():
        setattr(db_hero, key, value)
    
    db.commit()
    db.refresh(db_hero)
    return db_hero

def delete_about_hero(db: Session, hero_id: int):
    db_hero = get_about_hero(db, hero_id)
    if db_hero:
        db.delete(db_hero)
        db.commit()
        return True
    return False

def get_active_about_hero(db: Session):
    return db.query(AboutHero).filter(AboutHero.is_active == True).first()
from sqlalchemy.orm import Session
from models.contact_hero import ContactHero
from schemas.contact_hero import ContactHeroCreate

def create_contact_hero(db: Session, hero: ContactHeroCreate):
    db_hero = ContactHero(**hero.dict())
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero

def get_contact_hero(db: Session, hero_id: int):
    return db.query(ContactHero).filter(ContactHero.id == hero_id).first()

def get_all_contact_heroes(db: Session, active_only: bool = False):
    query = db.query(ContactHero)
    if active_only:
        query = query.filter(ContactHero.is_active == True)
    return query.all()

def update_contact_hero(db: Session, hero_id: int, hero: ContactHeroCreate):
    db_hero = get_contact_hero(db, hero_id)
    if not db_hero:
        return None
    
    for key, value in hero.dict().items():
        setattr(db_hero, key, value)
    
    db.commit()
    db.refresh(db_hero)
    return db_hero

def delete_contact_hero(db: Session, hero_id: int):
    db_hero = get_contact_hero(db, hero_id)
    if db_hero:
        db.delete(db_hero)
        db.commit()
        return True
    return False

def get_active_contact_hero(db: Session):
    return db.query(ContactHero).filter(ContactHero.is_active == True).first()
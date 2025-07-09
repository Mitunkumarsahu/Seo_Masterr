from sqlalchemy.orm import Session
from models.faq import FAQ
from schemas.faq import FAQCreate

def create_faq(db: Session, faq: FAQCreate):
    db_faq = FAQ(**faq.dict())
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq

def get_faq(db: Session, faq_id: int):
    return db.query(FAQ).filter(FAQ.id == faq_id).first()

def get_faqs(db: Session, active_only: bool = False):
    query = db.query(FAQ)
    if active_only:
        query = query.filter(FAQ.is_active == True)
    return query.order_by(FAQ.order).all()

def update_faq(db: Session, faq_id: int, faq: FAQCreate):
    db_faq = get_faq(db, faq_id)
    if not db_faq:
        return None
    
    for key, value in faq.dict().items():
        setattr(db_faq, key, value)
    
    db.commit()
    db.refresh(db_faq)
    return db_faq

def delete_faq(db: Session, faq_id: int):
    db_faq = get_faq(db, faq_id)
    if db_faq:
        db.delete(db_faq)
        db.commit()
        return True
    return False
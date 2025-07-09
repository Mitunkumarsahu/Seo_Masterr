from sqlalchemy.orm import Session
from models.testimonial import Testimonial
from schemas.testimonial import TestimonialCreate

def create_testimonial(db: Session, testimonial: TestimonialCreate):
    db_testimonial = Testimonial(**testimonial.model_dump())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def get_testimonial(db: Session, testimonial_id: int):
    return db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()

def get_testimonials(db: Session):
    return db.query(Testimonial).order_by(Testimonial.order).all()

def update_testimonial(db: Session, testimonial_id: int, testimonial: TestimonialCreate):
    db_testimonial = get_testimonial(db, testimonial_id)
    if not db_testimonial:
        return None
    
    for key, value in testimonial.model_dump().items():
        setattr(db_testimonial, key, value)
    
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

def delete_testimonial(db: Session, testimonial_id: int):
    db_testimonial = get_testimonial(db, testimonial_id)
    if db_testimonial:
        db.delete(db_testimonial)
        db.commit()
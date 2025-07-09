from sqlalchemy.orm import Session
from models.why_choose_us import WhyChooseUs
from schemas.why_choose_us import WhyChooseUsCreate

def create_why_choose_us(db: Session, data: WhyChooseUsCreate):
    # Convert points list to newline-separated string
    points_text = "\n".join(data.points)
    
    db_section = WhyChooseUs(
        heading=data.heading,
        description=data.description,
        image_url=data.image_url,
        points=points_text,
        is_active=data.is_active
    )
    db.add(db_section)
    db.commit()
    db.refresh(db_section)
    return db_section

def get_why_choose_us(db: Session, section_id: int):
    section = db.query(WhyChooseUs).filter(WhyChooseUs.id == section_id).first()
    if section:
        # Convert points text to list
        section.points = section.points.split("\n") if section.points else []
    return section

def get_all_why_choose_us(db: Session):
    sections = db.query(WhyChooseUs).all()
    for section in sections:
        section.points = section.points.split("\n") if section.points else []
    return sections

def get_active_why_choose_us(db: Session):
    section = db.query(WhyChooseUs).filter(WhyChooseUs.is_active == True).first()
    if section:
        section.points = section.points.split("\n") if section.points else []
    return section

def update_why_choose_us(db: Session, section_id: int, data: WhyChooseUsCreate):
    db_section = get_why_choose_us(db, section_id)
    if not db_section:
        return None
    
    # Convert points list to newline-separated string
    points_text = "\n".join(data.points)
    
    db_section.heading = data.heading
    db_section.description = data.description
    db_section.image_url = data.image_url
    db_section.points = points_text
    db_section.is_active = data.is_active
    
    db.commit()
    db.refresh(db_section)
    return db_section

def delete_why_choose_us(db: Session, section_id: int):
    db_section = get_why_choose_us(db, section_id)
    if db_section:
        db.delete(db_section)
        db.commit()
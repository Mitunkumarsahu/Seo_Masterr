from sqlalchemy.orm import Session
from models.contact_info import ContactInfo
from schemas.contact_info import ContactInfoCreate

def create_contact_info(db: Session, info: ContactInfoCreate):
    # Convert phone numbers list to comma-separated string
    phones_str = ",".join(info.phone_numbers)
    
    db_info = ContactInfo(
        section_title=info.section_title,
        address=info.address,
        email=info.email,
        phone_numbers=phones_str,
        toll_free=info.toll_free,
        map_embed=info.map_embed,
        is_active=info.is_active
    )
    db.add(db_info)
    db.commit()
    db.refresh(db_info)
    return db_info

def get_contact_info(db: Session, info_id: int):
    info = db.query(ContactInfo).filter(ContactInfo.id == info_id).first()
    if info:
        # Convert phone numbers to list
        info.phone_numbers = info.phone_numbers.split(",") if info.phone_numbers else []
    return info

def get_all_contact_info(db: Session):
    infos = db.query(ContactInfo).all()
    for info in infos:
        info.phone_numbers = info.phone_numbers.split(",") if info.phone_numbers else []
    return infos

def get_active_contact_info(db: Session):
    info = db.query(ContactInfo).filter(ContactInfo.is_active == True).first()
    if info:
        info.phone_numbers = info.phone_numbers.split(",") if info.phone_numbers else []
    return info

def update_contact_info(db: Session, info_id: int, info: ContactInfoCreate):
    db_info = get_contact_info(db, info_id)
    if not db_info:
        return None
    
    # Convert phone numbers list to comma-separated string
    phones_str = ",".join(info.phone_numbers)
    
    db_info.section_title = info.section_title
    db_info.address = info.address
    db_info.email = info.email
    db_info.phone_numbers = phones_str
    db_info.toll_free = info.toll_free
    db_info.map_embed = info.map_embed
    db_info.is_active = info.is_active
    
    db.commit()
    db.refresh(db_info)
    return db_info

def delete_contact_info(db: Session, info_id: int):
    db_info = get_contact_info(db, info_id)
    if db_info:
        db.delete(db_info)
        db.commit()
        return True
    return False
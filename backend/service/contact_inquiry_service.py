from sqlalchemy.orm import Session
from models.contact_inquiry import ContactInquiry
from schemas.contact_inquiry import ContactInquiryCreate

def create_contact_inquiry(db: Session, inquiry: ContactInquiryCreate):
    db_inquiry = ContactInquiry(
        name=inquiry.name,
        email=inquiry.email,
        phone=inquiry.phone,
        message=inquiry.message
    )
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

def get_contact_inquiry(db: Session, inquiry_id: int):
    return db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()

def get_all_contact_inquiries(db: Session, read_status: str = "all"):
    query = db.query(ContactInquiry)
    
    if read_status == "read":
        query = query.filter(ContactInquiry.is_read == True)
    elif read_status == "unread":
        query = query.filter(ContactInquiry.is_read == False)
    
    return query.order_by(ContactInquiry.created_at.desc()).all()

def mark_as_read(db: Session, inquiry_id: int):
    inquiry = get_contact_inquiry(db, inquiry_id)
    if inquiry:
        inquiry.is_read = True
        db.commit()
        db.refresh(inquiry)
    return inquiry

def delete_contact_inquiry(db: Session, inquiry_id: int):
    inquiry = get_contact_inquiry(db, inquiry_id)
    if inquiry:
        db.delete(inquiry)
        db.commit()
        return True
    return False
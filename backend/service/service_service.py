from sqlalchemy.orm import Session
from models.service import Service, ServiceContent, ContentType
from schemas.service import ServiceCreate, ServiceContentCreate

def create_service(db: Session, service_data: ServiceCreate):
    # Create service
    db_service = Service(
        title=service_data.title,
        slug=service_data.slug,
        meta_description=service_data.meta_description,
        is_active=service_data.is_active
    )
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    
    # Add contents
    if service_data.contents:
        for content in service_data.contents:
            db_content = ServiceContent(
                service_id=db_service.id,
                order=content.order,
                content_type=ContentType[content.content_type.upper()],
                content=content.content,
                image_url=content.image_url
            )
            db.add(db_content)
        db.commit()
        db.refresh(db_service)
    
    return db_service

def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id).first()

def get_services(db: Session):
    return db.query(Service).all()

def update_service(db: Session, service_id: int, service_data: ServiceCreate):
    db_service = get_service(db, service_id)
    if not db_service:
        return None
    
    # Update service fields
    db_service.title = service_data.title
    db_service.slug = service_data.slug
    db_service.meta_description = service_data.meta_description
    db_service.is_active = service_data.is_active
    
    # Clear existing contents
    db.query(ServiceContent).filter(ServiceContent.service_id == service_id).delete()
    
    # Add new contents
    if service_data.contents:
        for content in service_data.contents:
            db_content = ServiceContent(
                service_id=db_service.id,
                order=content.order,
                content_type=ContentType[content.content_type.upper()],
                content=content.content,
                image_url=content.image_url
            )
            db.add(db_content)
    
    db.commit()
    db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    db_service = get_service(db, service_id)
    if db_service:
        db.delete(db_service)
        db.commit()

from sqlalchemy.orm import Session
from models.service import Service, ServiceType
from schemas.service import ServiceCreate, ServiceTypeCreate

def create_service(db: Session, service_data: ServiceCreate):
    db_service = Service(
        title=service_data.title,
        slug=service_data.slug,
        meta_description=service_data.meta_description,
        is_active=service_data.is_active,
        content=service_data.content,
        service_type_id=service_data.service_type_id  # Add service type
    )
    db.add(db_service)
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
    
    db_service.title = service_data.title
    db_service.slug = service_data.slug
    db_service.meta_description = service_data.meta_description
    db_service.is_active = service_data.is_active
    db_service.content = service_data.content
    db_service.service_type_id = service_data.service_type_id
    
    db.commit()
    db.refresh(db_service)
    return db_service

# Add CRUD for ServiceType
def create_service_type(db: Session, service_type_data: ServiceTypeCreate):
    db_service_type = ServiceType(**service_type_data.dict())
    db.add(db_service_type)
    db.commit()
    db.refresh(db_service_type)
    return db_service_type

def get_service_type(db: Session, service_type_id: int):
    return db.query(ServiceType).filter(ServiceType.id == service_type_id).first()

def get_service_types(db: Session):
    return db.query(ServiceType).all()


def delete_service(db: Session, service_id: int):
    db_service = get_service(db, service_id)
    if not db_service:
        return None
    
    db.delete(db_service)
    db.commit()
    return db_service
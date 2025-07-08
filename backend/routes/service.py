from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from schemas.service import ServiceCreate, ServiceOut
from service.service_service import create_service, get_service, get_services, update_service, delete_service
from utils.db import get_db
from models.user import User
from service.auth_service import has_permission
from routes.auth import require_permission
import uuid
import os

router = APIRouter(prefix="/services", tags=["Services"])

# Image upload endpoint
@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(require_permission("manage_services"))
):
    # Generate unique filename
    ext = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    
    # Save file (in production, use cloud storage)
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    return {"url": f"/{file_path}"}

# Service CRUD endpoints
@router.post("/", response_model=ServiceOut)
def create_new_service(
    service: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_services"))
):
    return create_service(db, service)

@router.get("/", response_model=list[ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return get_services(db)

@router.get("/{service_id}", response_model=ServiceOut)
def get_service_by_id(service_id: int, db: Session = Depends(get_db)):
    service = get_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.put("/{service_id}", response_model=ServiceOut)
def update_existing_service(
    service_id: int,
    service: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_services"))
):
    return update_service(db, service_id, service)

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_services"))
):
    delete_service(db, service_id)
    return
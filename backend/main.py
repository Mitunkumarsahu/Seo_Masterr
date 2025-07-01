from fastapi import FastAPI
from utils.db import Base, engine
from models import user
from routes import auth
from service.auth_service import create_user, get_user_by_email
from utils.db import SessionLocal
from models.user import Role
import os

app = FastAPI()
app.include_router(auth.router)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    if not get_user_by_email(db, os.getenv("SUPERADMIN_EMAIL")):
        from schemas.user import UserCreate
        super_admin = UserCreate(
            username="superadmin",
            email=os.getenv("SUPERADMIN_EMAIL"),
            password=os.getenv("SUPERADMIN_PASSWORD")
        )
        create_user(db, super_admin, role=Role.super_admin)
        print("Super Admin Created")
    db.close()

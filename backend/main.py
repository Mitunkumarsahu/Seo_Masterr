from fastapi import FastAPI
from utils.db import Base, engine, SessionLocal
from models import user
from routes import auth
from service.auth_service import create_user, get_user_by_email, verify_password
from models.user import Role, User
from schemas.user import UserCreate
from starlette_admin.contrib.sqla import Admin, ModelView
from starlette.requests import Request
from starlette.responses import Response
from starlette_admin.auth import AdminConfig, AdminUser, AuthProvider
from starlette_admin.exceptions import FormValidationError, LoginFailed
from typing import List
from starlette.middleware.sessions import SessionMiddleware
from email_validator import validate_email, EmailNotValidError
from admin.DatabaseAuthProvider import DatabaseAuthProvider
import os

app = FastAPI()

# Add session middleware
app.add_middleware(SessionMiddleware, secret_key="super-secret-session-key")

# Include your auth routes
app.include_router(auth.router)



# Mount Starlette Admin
admin = Admin(
    engine,
    title="Admin Panel",
    auth_provider=DatabaseAuthProvider(),
)
admin.mount_to(app)
admin.add_view(ModelView(User))



@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        super_admin_email = os.getenv("SUPERADMIN_EMAIL")
        if super_admin_email and not get_user_by_email(db, super_admin_email):
            super_admin = UserCreate(
                username="superadmin",
                email=super_admin_email,
                password=os.getenv("SUPERADMIN_PASSWORD")
            )
            create_user(db, super_admin, role=Role.super_admin)
            print("Super Admin Created")
    finally:
        db.close()

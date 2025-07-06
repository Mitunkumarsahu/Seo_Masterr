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
import os

class DatabaseAuthProvider(AuthProvider):
    def get_db(self):
        """Get database session"""
        db = SessionLocal()
        try:
            return db
        finally:
            pass  

    async def login(
        self,
        username: str,
        password: str,
        remember_me: bool,
        request: Request,
        response: Response,
    ) -> Response:
        if len(username) < 3:
            raise FormValidationError({"username": "Ensure username has at least 03 characters"})

        db = self.get_db()
        try:
            try:
                print(f"Validating email: {username}")
                user = get_user_by_email(db, username)
            except EmailNotValidError:
                user = db.query(User).filter(User.username == username).first()

            if user:
                print(f"User found: {user.username}")
                if verify_password(password, user.password):
                    request.session.update({"user_id": user.id})
                    return response
                else:
                    print("Password mismatch")
            else:
                print("User not found")

            raise LoginFailed("Invalid username or password")
        finally:
            db.close()

    async def is_authenticated(self, request) -> bool:
        user_id = request.session.get("user_id")
        if user_id:
            db = self.get_db()
            try:
                user = db.query(User).filter(User.id == user_id).first()
                if user:
                    request.state.user = user
                    return True
            finally:
                db.close()

        return False

    def get_admin_config(self, request: Request) -> AdminConfig:
        user = request.state.user
        custom_app_title = f"Hello, {user.username}!"
        custom_logo_url = None
        return AdminConfig(
            app_title=custom_app_title,
            logo_url=custom_logo_url,
        )

    def get_admin_user(self, request: Request) -> AdminUser:
        user = request.state.user
        photo_url = None
        return AdminUser(username=user.username, photo_url=photo_url)

    async def logout(self, request: Request, response: Response) -> Response:
        request.session.clear()
        return response

    def get_user_roles(self, user: User) -> List[str]:
        role_permissions = {
            Role.super_admin: ["read", "create", "edit", "delete", "action_make_published"],
            Role.admin: ["read", "create", "edit", "action_make_published"],
            Role.user: ["read"],
        }
        return role_permissions.get(user.role, ["read"])


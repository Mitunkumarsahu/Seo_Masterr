from sqlalchemy.orm import Session
from models.user import User, Role
from schemas.user import UserCreate, UserLogin
from utils.auth import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

# def get_user_by_username(db: Session, username: str):
#     return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_data: UserCreate, role: Role = Role.user, is_google=False):
    user = User(
        username=user_data.username,
        email=user_data.email,
        password=hash_password(user_data.password) if user_data.password else None,
        role=role,
        is_google_account=is_google
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_email(db, username)
    if not user or not user.password:
        return None
    if not verify_password(password, user.password):
        return None
    return user

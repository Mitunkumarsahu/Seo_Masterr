from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.user import UserCreate, UserLogin, UserOut, EditorCreate
from service.auth_service import create_user, authenticate_user, get_user_by_email, has_permission
from utils.db import SessionLocal
from utils.auth import create_access_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from models.user import User
from utils.auth import SECRET_KEY, ALGORITHM
from utils.db import get_db
from sqlalchemy import or_
import requests
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, "SECRET_KEY", algorithms=["HS256"])
        identifier: str = payload.get("sub")
        if identifier is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Try both email and username
    user = db.query(User).filter(
        or_(User.email == identifier, User.username == identifier)
    ).first()
    
    if user is None:
        raise credentials_exception
    return user

def require_super_admin(user: User = Depends(get_current_user)):
    if not user.is_super_admin:
        raise HTTPException(status_code=403, detail="Only Super Admins allowed")
    return user

# def require_permission(permission: str):
#     def dependency(
#         db: Session = Depends(get_db),
#         current_user: User = Depends(get_current_user)
#     ):
#         if not has_permission(db, current_user.id, permission):
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail=f"Requires {permission} permission"
#             )
#         return current_user
#     return dependency

@router.post("/signup", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})  
    return {"access_token": token, "token_type": "bearer"}

@router.get("/protected", response_model=UserOut)
def protected_route(current_user: User = Depends(get_current_user)):
    return current_user



@router.post("/create-editor", response_model=UserOut)
def create_editor(
    editor: EditorCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_super_admin)
):
    return create_user(db, editor)

# --------------------------
# Google Login endpoint
# --------------------------
class GoogleLoginRequest(BaseModel):
    token: str  # credential from frontend

GOOGLE_CLIENT_ID = "284681747746-28vo0j4vmf79lbu3ia7oqqljmu7cc4on.apps.googleusercontent.com"

@router.post("/google-login")
def google_login(data: GoogleLoginRequest, db: Session = Depends(get_db)):
    # Verify token with Google
    resp = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={data.token}"
    )
    if resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    payload = resp.json()

    # Verify audience
    if payload.get("aud") != GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    email = payload.get("email")
    name = payload.get("name")

    if not email:
        raise HTTPException(status_code=400, detail="Google token missing email")

    # Check if user exists
    user = db.query(User).filter(User.email == email).first()

    if not user:
        user_data = {
            "username": email.split("@")[0],
            "email": email,
            "full_name": name,
            "password": "password@123"
        }
        user = create_user(db, user_data)

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

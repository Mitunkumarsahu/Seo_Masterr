from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.user import UserCreate, UserLogin, UserOut
from service.auth_service import create_user, authenticate_user, get_user_by_email
from utils.db import SessionLocal
from utils.auth import create_access_token
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from models.user import User, Role
from utils.auth import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401)
    except JWTError:
        raise HTTPException(status_code=401)
    
    user = get_user_by_email(db, username)
    if user is None:
        raise HTTPException(status_code=404)
    return user

def require_super_admin(user: User = Depends(get_current_user)):
    if user.role != Role.super_admin:
        raise HTTPException(status_code=403, detail="Only Super Admins allowed")
    return user

@router.post("/signup", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/protected", response_model=UserOut)
def protected_route(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/create-editor")
def create_editor(user: UserCreate, db: Session = Depends(get_db), _: User = Depends(require_super_admin)):
    return create_user(db, user, role=Role.editor)


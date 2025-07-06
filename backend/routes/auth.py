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

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_email(db, username)
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
    token = create_access_token({"sub": user.username})
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


def require_permission(permission: str):
    def dependency(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
    ):
        if not has_permission(db, current_user.id, permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Requires {permission} permission"
            )
        return current_user
    return dependency
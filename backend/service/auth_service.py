from sqlalchemy.orm import Session
from models.user import User, Permission
from schemas.user import UserCreate
from utils.auth import hash_password, verify_password
from sqlalchemy.orm import selectinload

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user_data: UserCreate, is_google=False, is_super_admin=False):
    # Get permission objects from names
    permission_objs = []
    for perm_name in user_data.permissions:
        perm = db.query(Permission).filter(Permission.name == perm_name).first()
        if perm:
            permission_objs.append(perm)
    
    user = User(
        username=user_data.username,
        email=user_data.email,
        password=hash_password(user_data.password) if user_data.password else None,
        is_google_account=is_google,
        is_super_admin=is_super_admin,  
        is_editor=user_data.is_editor,
        permissions=permission_objs
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

# service/auth_service.py
def has_permission(db: Session, user_id: int, permission: str) -> bool:
    user = db.query(User).options(selectinload(User.permissions)).filter(
        User.id == user_id
    ).first()
    
    if not user:
        return False
        
    # Super admin has all permissions
    if user.is_super_admin:
        return True
        
    # Check for specific permission
    return any(perm.name == permission for perm in user.permissions)


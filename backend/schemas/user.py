from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: Optional[str] = None
    permissions: Optional[List[str]] = []  
    is_editor: bool = False

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_super_admin: bool
    is_editor: bool
    permissions: List[str] = []

    class Config:
        from_attributes = True

class EditorCreate(UserCreate):
    is_editor: bool = True
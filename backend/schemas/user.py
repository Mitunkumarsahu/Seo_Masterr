from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum

class Role(str, Enum):
    super_admin = "super_admin"
    editor = "editor"
    user = "user"

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: Optional[str] = None
    permissions: Optional[List[str]] = []

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: Role

    model_config = {
        "from_attributes": True
    }


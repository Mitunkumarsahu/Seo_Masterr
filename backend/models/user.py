from sqlalchemy import Column, Integer, String, Boolean, Enum
from utils.db import Base
import enum

class Role(enum.Enum):
    super_admin = "super_admin"
    editor = "editor"
    user = "user"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=True)  
    is_google_account = Column(Boolean, default=False)
    role = Column(Enum(Role), default=Role.user)

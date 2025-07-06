from sqlalchemy import Column, Integer, String, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
from utils.db import Base

user_permission = Table(
    'user_permission', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('permission_id', Integer, ForeignKey('permissions.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=True)  
    is_google_account = Column(Boolean, default=False)
    is_super_admin = Column(Boolean, default=False)
    is_editor = Column(Boolean, default=False)
    
    permissions = relationship("Permission", secondary=user_permission, back_populates="users", lazy="selectin")

class Permission(Base):
    __tablename__ = "permissions"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))
    
    users = relationship("User", secondary=user_permission, back_populates="permissions", lazy="selectin")
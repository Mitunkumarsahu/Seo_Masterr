from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from utils.db import Base
from sqlalchemy.dialects.mysql import LONGTEXT

class ServiceType(Base):
    __tablename__ = "service_types"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    meta_description = Column(Text)
    is_active = Column(Boolean, default=True)
    content = Column(LONGTEXT, nullable=True)
    image_url = Column(String(512), nullable=True)
    
    # Add relationship to service_type
    service_type_id = Column(Integer, ForeignKey("service_types.id"))
    service_type = relationship("ServiceType", backref="services")
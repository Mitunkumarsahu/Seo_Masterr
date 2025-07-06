from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from utils.db import Base
import enum

class ContentType(enum.Enum):
    H1 = "h1"
    H2 = "h2"
    H3 = "h3"
    PARAGRAPH = "paragraph"
    BULLET = "bullet"
    IMAGE = "image"
    BOLD = "bold"
    ITALIC = "italic"

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    meta_description = Column(Text)
    is_active = Column(Boolean, default=True)
    contents = relationship("ServiceContent", back_populates="service", cascade="all, delete-orphan")

class ServiceContent(Base):
    __tablename__ = "service_contents"
    
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id"))
    order = Column(Integer, nullable=False, default=0)
    content_type = Column(Enum(ContentType), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)  # For image content
    
    service = relationship("Service", back_populates="contents")
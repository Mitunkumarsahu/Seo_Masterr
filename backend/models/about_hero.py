from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class AboutHero(Base):
    __tablename__ = "about_heroes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(512), nullable=True)
    is_active = Column(Boolean, default=True)
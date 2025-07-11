from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class Achievement(Base):
    __tablename__ = "achievement"
    
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(512), nullable=True)
    count = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
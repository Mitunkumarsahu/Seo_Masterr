from sqlalchemy import Column, Integer, String, Text
from utils.db import Base

class HomeFeature(Base):
    __tablename__ = "home_features"
    
    id = Column(Integer, primary_key=True, index=True)
    position = Column(Integer, nullable=False)  # Removed unique constraint
    heading = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(512), nullable=False)
from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class WhyChooseUs(Base):
    __tablename__ = "why_choose_us"
    
    id = Column(Integer, primary_key=True, index=True)
    heading = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(512), nullable=True)
    points = Column(Text, nullable=False)  # Store points as newline-separated text
    is_active = Column(Boolean, default=True)
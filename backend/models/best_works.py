from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class BestWork(Base):
    __tablename__ = "best_works"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    image_url = Column(String(512), nullable=False)
    description = Column(Text, nullable=True)  # Optional description
    order = Column(Integer, default=0)  # For sorting
    is_active = Column(Boolean, default=True)
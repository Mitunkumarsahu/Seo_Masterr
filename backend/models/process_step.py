from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class ProcessStep(Base):
    __tablename__ = "process_steps"
    
    id = Column(Integer, primary_key=True, index=True)
    # title = Column(String(100), nullable=False)  # e.g., "01. Discover"
    heading = Column(String(100), nullable=False)  # e.g., "Discover"
    description = Column(Text, nullable=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
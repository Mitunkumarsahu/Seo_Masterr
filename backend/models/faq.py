from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class FAQ(Base):
    __tablename__ = "faqs"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    order = Column(Integer, default=0)  # For sorting
    is_active = Column(Boolean, default=True)
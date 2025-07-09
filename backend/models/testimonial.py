from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class Testimonial(Base):
    __tablename__ = "testimonials"
    
    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100), nullable=False)
    client_title = Column(String(100), nullable=False)
    company = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
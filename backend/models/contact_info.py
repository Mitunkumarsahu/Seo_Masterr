from sqlalchemy import Column, Integer, String, Text, Boolean
from utils.db import Base

class ContactInfo(Base):
    __tablename__ = "contact_info"
    
    id = Column(Integer, primary_key=True, index=True)
    section_title = Column(String(255), default="Reach Us")
    address = Column(Text, nullable=False)
    email = Column(String(255), nullable=False)
    phone_numbers = Column(Text, nullable=False)  # Comma-separated numbers
    toll_free = Column(String(50), nullable=True)
    map_embed = Column(Text, nullable=True)  # Iframe embed code
    is_active = Column(Boolean, default=True)
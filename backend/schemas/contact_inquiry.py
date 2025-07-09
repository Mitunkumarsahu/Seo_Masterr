from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ContactInquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactInquiryCreate(ContactInquiryBase):
    pass

class ContactInquiryOut(ContactInquiryBase):
    id: int
    created_at: datetime
    is_read: bool

    class Config:
        from_attributes = True
from pydantic import BaseModel
from typing import List, Optional

class ContactInfoBase(BaseModel):
    section_title: Optional[str] = "Reach Us"
    address: str
    email: str
    phone_numbers: List[str]  # List of phone numbers
    toll_free: Optional[str] = None
    map_embed: Optional[str] = None
    is_active: bool = True

class ContactInfoCreate(ContactInfoBase):
    pass

class ContactInfoOut(ContactInfoBase):
    id: int

    class Config:
        from_attributes = True
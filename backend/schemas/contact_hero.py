from pydantic import BaseModel, HttpUrl
from typing import Optional

class ContactHeroBase(BaseModel):
    title: str
    description: str
    image_url: Optional[HttpUrl] = None
    is_active: bool = True

class ContactHeroCreate(ContactHeroBase):
    pass

class ContactHeroOut(ContactHeroBase):
    id: int

    class Config:
        from_attributes = True
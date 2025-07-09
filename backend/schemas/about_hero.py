from pydantic import BaseModel, HttpUrl
from typing import Optional

class AboutHeroBase(BaseModel):
    title: str
    description: str
    image_url: Optional[HttpUrl] = None
    is_active: bool = True

class AboutHeroCreate(AboutHeroBase):
    pass

class AboutHeroOut(AboutHeroBase):
    id: int

    class Config:
        from_attributes = True
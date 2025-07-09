from pydantic import BaseModel, HttpUrl
from typing import Optional

class TestimonialBase(BaseModel):
    client_name: str
    client_title: str
    company: str
    content: str
    image_url: Optional[HttpUrl] = None
    is_active: bool = True
    order: int = 0

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialOut(TestimonialBase):
    id: int

    class Config:
        from_attributes = True
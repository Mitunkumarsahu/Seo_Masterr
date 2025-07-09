from pydantic import BaseModel, HttpUrl
from typing import Optional

class BestWorkBase(BaseModel):
    title: str
    image_url: HttpUrl
    description: Optional[str] = None
    order: int = 0
    is_active: bool = True

class BestWorkCreate(BestWorkBase):
    pass

class BestWorkOut(BestWorkBase):
    id: int

    class Config:
        from_attributes = True
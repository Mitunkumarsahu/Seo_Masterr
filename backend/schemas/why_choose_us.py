from pydantic import BaseModel, HttpUrl
from typing import List

class WhyChooseUsBase(BaseModel):
    heading: str
    description: str
    image_url: HttpUrl = None
    points: List[str]  # List of points
    is_active: bool = True

class WhyChooseUsCreate(WhyChooseUsBase):
    pass

class WhyChooseUsOut(WhyChooseUsBase):
    id: int

    class Config:
        from_attributes = True
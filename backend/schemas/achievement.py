from pydantic import BaseModel, HttpUrl
from typing import Optional

class AchievementBase(BaseModel):
    title: str
    count: int
    image_url: Optional[HttpUrl] = None

class AchievementCreate(AchievementBase):
    pass

class AchievementOut(AchievementBase):
    id: int

    class Config:
        from_attributes = True
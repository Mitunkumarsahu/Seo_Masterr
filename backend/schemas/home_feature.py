from pydantic import BaseModel, HttpUrl

class HomeFeatureBase(BaseModel):
    position: int  # 1, 2, or 3
    heading: str
    description: str
    image_url: HttpUrl

class HomeFeatureCreate(HomeFeatureBase):
    pass

class HomeFeatureOut(HomeFeatureBase):
    id: int

    class Config:
        from_attributes = True
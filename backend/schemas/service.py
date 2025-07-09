from pydantic import BaseModel, HttpUrl
from typing import Optional

class ServiceTypeBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    is_active: bool = True

class ServiceTypeCreate(ServiceTypeBase):
    pass

class ServiceTypeOut(ServiceTypeBase):
    id: int

    class Config:
        from_attributes = True

class ServiceBase(BaseModel):
    title: str
    slug: str
    meta_description: Optional[str] = None
    is_active: bool = True
    content: str
    image_url: Optional[HttpUrl] = None
    service_type_id: int  # Add service type reference

class ServiceCreate(ServiceBase):
    pass

class ServiceOut(ServiceBase):
    id: int
    service_type: ServiceTypeOut  # Include service type details

    class Config:
        from_attributes = True
# from pydantic import BaseModel, HttpUrl
# from enum import Enum
# from typing import Optional, List

# class ContentType(str, Enum):
#     H1 = "h1"
#     H2 = "h2"
#     H3 = "h3"
#     PARAGRAPH = "paragraph"
#     BULLET = "bullet"
#     IMAGE = "image"
#     BOLD = "bold"
#     ITALIC = "italic"

# class ServiceContentBase(BaseModel):
#     order: int
#     content_type: ContentType
#     content: str
#     image_url: Optional[HttpUrl] = None

# class ServiceContentCreate(ServiceContentBase):
#     pass

# class ServiceContentOut(ServiceContentBase):
#     id: int
#     service_id: int

#     class Config:
#         from_attributes = True

# class ServiceBase(BaseModel):
#     title: str
#     slug: str
#     meta_description: Optional[str] = None
#     is_active: bool = True

# class ServiceCreate(ServiceBase):
#     contents: Optional[List[ServiceContentCreate]] = None

# class ServiceOut(ServiceBase):
#     id: int
#     contents: List[ServiceContentOut] = []

#     class Config:
#         from_attributes = True



from pydantic import BaseModel, HttpUrl
from typing import Optional

class ServiceBase(BaseModel):
    title: str
    slug: str
    meta_description: Optional[str] = None
    is_active: bool = True
    content: str  # Add this field
    image_url: Optional[HttpUrl] = None  # 👈 Add this


class ServiceCreate(ServiceBase):
    pass

class ServiceOut(ServiceBase):
    id: int

    class Config:
        from_attributes = True
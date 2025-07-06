from pydantic import BaseModel, HttpUrl
from enum import Enum
from typing import Optional, List
from datetime import datetime

class ContentType(str, Enum):
    H1 = "h1"
    H2 = "h2"
    H3 = "h3"
    PARAGRAPH = "paragraph"
    BULLET = "bullet"
    IMAGE = "image"
    BOLD = "bold"
    ITALIC = "italic"
    QUOTE = "quote"

class BlogContentBase(BaseModel):
    order: int
    content_type: ContentType
    content: str
    image_url: Optional[HttpUrl] = None

class BlogContentCreate(BlogContentBase):
    pass

class BlogContentOut(BlogContentBase):
    id: int
    blog_id: int

    class Config:
        from_attributes = True

class BlogCategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class BlogCategoryCreate(BlogCategoryBase):
    pass

class BlogCategoryOut(BlogCategoryBase):
    id: int

    class Config:
        from_attributes = True

class BlogBase(BaseModel):
    title: str
    slug: str
    meta_description: Optional[str] = None
    is_active: bool = True
    featured_image: Optional[HttpUrl] = None
    published_at: Optional[datetime] = None
    author_id: Optional[int] = None
    category_ids: Optional[List[int]] = None

class BlogCreate(BlogBase):
    contents: Optional[List[BlogContentCreate]] = None

class BlogOut(BlogBase):
    id: int
    contents: List[BlogContentOut] = []
    categories: List[BlogCategoryOut] = []
    author: Optional[str] = None

    class Config:
        from_attributes = True
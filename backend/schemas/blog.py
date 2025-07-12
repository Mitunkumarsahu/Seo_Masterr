from pydantic import BaseModel, HttpUrl, field_validator
from datetime import datetime
from typing import Optional, List

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
    content: str  # Add this field

class BlogCreate(BlogBase):
    pass

class BlogOut(BlogBase):
    id: int
    categories: List[BlogCategoryOut] = []
    author: Optional[str] = None

    class Config:
        from_attributes = True

    @field_validator('author', mode='before')
    def convert_author(cls, v):
        if hasattr(v, 'username'):
            return v.username
        return v
    


# Add to schemas/blog.py
class PaginatedBlogs(BaseModel):
    items: List[BlogOut]
    total: int
    page: int
    page_size: int

class BlogWithRecent(BaseModel):
    blog: BlogOut
    recent_blogs: List[BlogOut]
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, Boolean, DateTime, Table
from sqlalchemy.orm import relationship
from utils.db import Base
from datetime import datetime
import enum
from sqlalchemy.dialects.mysql import LONGTEXT

class ContentType(enum.Enum):
    H1 = "h1"
    H2 = "h2"
    H3 = "h3"
    PARAGRAPH = "paragraph"
    BULLET = "bullet"
    IMAGE = "image"
    BOLD = "bold"
    ITALIC = "italic"
    QUOTE = "quote"

# class Blog(Base):
#     __tablename__ = "blogs"
    
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(255), nullable=False)
#     slug = Column(String(255), unique=True, nullable=False)
#     meta_description = Column(Text)
#     is_active = Column(Boolean, default=True)
#     featured_image = Column(String(255), nullable=True)
#     published_at = Column(DateTime, default=datetime.utcnow)
#     author_id = Column(Integer, ForeignKey("users.id"))
#     contents = relationship("BlogContent", back_populates="blog", cascade="all, delete-orphan")
#     categories = relationship("BlogCategory", secondary="blog_category_association", back_populates="blogs")
    
#     author = relationship("User")

# class BlogContent(Base):
#     __tablename__ = "blog_contents"
    
#     id = Column(Integer, primary_key=True, index=True)
#     blog_id = Column(Integer, ForeignKey("blogs.id"))
#     order = Column(Integer, nullable=False, default=0)
#     content_type = Column(Enum(ContentType), nullable=False)
#     content = Column(Text, nullable=False)
#     image_url = Column(String(255), nullable=True)
    
#     blog = relationship("Blog", back_populates="contents")


class Blog(Base):
    __tablename__ = "blogs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    meta_description = Column(Text)
    is_active = Column(Boolean, default=True)
    featured_image = Column(String(255), nullable=True)
    published_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))
    # Remove contents relationship
    categories = relationship("BlogCategory", secondary="blog_category_association", back_populates="blogs")
    content = Column(LONGTEXT, nullable=True)  # Add this column for HTML content
    
    author = relationship("User")

class BlogCategory(Base):
    __tablename__ = "blog_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    slug = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    blogs = relationship("Blog", secondary="blog_category_association", back_populates="categories")

# Association table for many-to-many relationship
blog_category_association = Table(
    'blog_category_association', Base.metadata,
    Column('blog_id', Integer, ForeignKey('blogs.id'), primary_key=True),
    Column('category_id', Integer, ForeignKey('blog_categories.id'), primary_key=True)
)
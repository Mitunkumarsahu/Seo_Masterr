from sqlalchemy.orm import Session
from models.blog import Blog, BlogCategory, blog_category_association
from schemas.blog import BlogCreate, BlogCategoryCreate
from sqlalchemy.orm import selectinload

def create_blog(db: Session, blog_data: BlogCreate, author_id: int):
    db_blog = Blog(
        title=blog_data.title,
        slug=blog_data.slug,
        meta_description=blog_data.meta_description,
        is_active=blog_data.is_active,
        featured_image=blog_data.featured_image,
        published_at=blog_data.published_at,
        author_id=author_id,
        content=blog_data.content  # Add this
    )
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    
    # Add categories
    if blog_data.category_ids:
        for category_id in blog_data.category_ids:
            category = db.query(BlogCategory).get(category_id)
            if category:
                db_blog.categories.append(category)
    
    db.commit()
    db.refresh(db_blog)
    return db.query(Blog).options(
        selectinload(Blog.author),
        selectinload(Blog.categories)
    ).filter(Blog.id == db_blog.id).first()



def get_blog(db: Session, blog_id: int):
    return db.query(Blog).options(
        selectinload(Blog.author),
        selectinload(Blog.categories)
    ).filter(Blog.id == blog_id).first()


# def get_blogs(db: Session):
#     return db.query(Blog).options(
#         selectinload(Blog.author),
#         selectinload(Blog.categories)
#     ).all()

def get_blogs(db: Session, page: int = 1, page_size: int = 10):
    # Calculate offset
    offset = (page - 1) * page_size
    
    # Get paginated results
    blogs = db.query(Blog).options(
        selectinload(Blog.author),
        selectinload(Blog.categories)
    ).offset(offset).limit(page_size).all()
    
    # Get total count
    total = db.query(Blog).count()
    
    return total, blogs


def update_blog(db: Session, blog_id: int, blog_data: BlogCreate):
    db_blog = get_blog(db, blog_id)
    if not db_blog:
        return None
    
    # Update blog fields
    db_blog.title = blog_data.title
    db_blog.slug = blog_data.slug
    db_blog.meta_description = blog_data.meta_description
    db_blog.is_active = blog_data.is_active
    db_blog.featured_image = blog_data.featured_image
    db_blog.published_at = blog_data.published_at
    
    # Update categories
    db_blog.categories = []
    if blog_data.category_ids:
        for category_id in blog_data.category_ids:
            category = db.query(BlogCategory).get(category_id)
            if category:
                db_blog.categories.append(category)
    
    # Clear existing contents
    db.query(BlogContent).filter(BlogContent.blog_id == blog_id).delete()
    
    # Add new contents
    if blog_data.contents:
        for content in blog_data.contents:
            db_content = BlogContent(
                blog_id=db_blog.id,
                order=content.order,
                content_type=ContentType[content.content_type.upper()],
                content=content.content,
                image_url=content.image_url
            )
            db.add(db_content)
    
    db.commit()
    # db.refresh(db_blog)
    # return db_blog
    db.refresh(db_blog)
    db_blog = db.query(Blog).options(
        selectinload(Blog.author),
        selectinload(Blog.contents),
        selectinload(Blog.categories)
    ).filter(Blog.id == blog_id).first()
    
    return db_blog

def delete_blog(db: Session, blog_id: int):
    db_blog = get_blog(db, blog_id)
    if db_blog:
        db.delete(db_blog)
        db.commit()

def create_category(db: Session, category_data: BlogCategoryCreate):
    db_category = BlogCategory(
        name=category_data.name,
        slug=category_data.slug,
        description=category_data.description
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_categories(db: Session):
    return db.query(BlogCategory).all()
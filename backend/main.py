# from fastapi import FastAPI
# import os
# from utils.db import Base, engine, SessionLocal
# from models.user import User, Permission
# from models.service import Service, ServiceContent, ContentType as ServiceContentType
# from models.blog import Blog, BlogContent, BlogCategory, ContentType as BlogContentType
# from routes import auth, service, blog
# from starlette_admin.contrib.sqla import Admin, ModelView
# from schemas.user import UserCreate
# from service.auth_service import create_user as create_user_service, get_user_by_email
# from starlette_admin import fields
# from starlette.middleware.cors import CORSMiddleware
# from starlette.middleware.sessions import SessionMiddleware
# from fastapi.staticfiles import StaticFiles
# from admin.DatabaseAuthProvider import DatabaseAuthProvider  # Your custom AuthProvider
# from fastapi.requests import Request
# from fastapi.responses import RedirectResponse
# from utils.auth import hash_password, verify_password

# app = FastAPI()

# # Middleware: Session for login, then CORS
# app.add_middleware(SessionMiddleware, secret_key="super-secret-session-key")
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Mount static uploads directory
# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# # Include route modules
# app.include_router(auth.router)
# app.include_router(service.router)
# app.include_router(blog.router)

# # Admin Views
# class UserView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("username"),
#         fields.StringField("email"),
#         fields.BooleanField("is_google_account"),
#         fields.BooleanField("is_super_admin"),
#         fields.BooleanField("is_editor"),
#     ]
#     exclude_fields_from_list = ["password"]
#     exclude_fields_from_detail = ["password"]
#     form_include = [
#         "username", "email", "password", "is_google_account",
#         "is_super_admin", "is_editor"
#     ]

# class ServiceView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("title"),
#         fields.StringField("slug"),
#         fields.StringField("meta_description"),
#         fields.BooleanField("is_active"),
#         fields.HasMany("contents", identity="service_contents")
#     ]

# class ServiceContentView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.IntegerField("service_id"),
#         fields.IntegerField("order"),
#         fields.EnumField("content_type", enum=ServiceContentType, select2=False),
#         fields.StringField("content"),
#         fields.StringField("image_url")
#     ]

# class BlogView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("title"),
#         fields.StringField("slug"),
#         fields.TextAreaField("meta_description"),
#         fields.BooleanField("is_active"),
#         fields.StringField("featured_image"),
#         fields.DateTimeField("published_at"),
#         fields.HasOne("author", identity="users"),
#         fields.HasMany("contents", identity="blog_contents"),
#         fields.HasMany("categories", identity="blog_categories")
#     ]

# class BlogContentView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.IntegerField("blog_id"),
#         fields.IntegerField("order"),
#         fields.EnumField("content_type", enum=BlogContentType, select2=False),
#         fields.TextAreaField("content"),
#         fields.StringField("image_url")
#     ]

# class BlogCategoryView(ModelView):
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("name"),
#         fields.StringField("slug"),
#         fields.TextAreaField("description")
#     ]

# # Admin Setup
# admin = Admin(
#     engine,
#     title="SEO Masterr Admin",
#     auth_provider=DatabaseAuthProvider(),  # 👈 Custom AuthProvider
# )

# admin.add_view(UserView(User, icon="fa fa-user"))
# admin.add_view(ModelView(Permission, icon="fa fa-key"))
# admin.add_view(ServiceView(Service, identity="service", icon="fa fa-server"))
# admin.add_view(ServiceContentView(ServiceContent, icon="fa fa-list"))
# admin.add_view(BlogView(Blog, identity="blog", icon="fa fa-newspaper"))
# admin.add_view(BlogContentView(BlogContent, icon="fa fa-list-alt"))
# admin.add_view(BlogCategoryView(BlogCategory, icon="fa fa-tag"))

# admin.mount_to(app)

# # Startup logic
# @app.on_event("startup")
# def on_startup():
#     Base.metadata.create_all(bind=engine)
#     db = SessionLocal()

#     required_permissions = [
#         ("manage_services", "Manage services content"),
#         ("manage_blogs", "Manage blog content"),
#         ("manage_users", "Manage users"),
#     ]
#     for name, desc in required_permissions:
#         if not db.query(Permission).filter(Permission.name == name).first():
#             db.add(Permission(name=name, description=desc))

  
#     super_admin_email = os.getenv("SUPERADMIN_EMAIL")
#     super_admin_password = os.getenv("SUPERADMIN_PASSWORD")
#     if super_admin_email and not get_user_by_email(db, super_admin_email):
#         super_admin_data = UserCreate(
#             username="superadmin",
#             email=super_admin_email,
#             password=super_admin_password,
#             permissions=[p.name for p in db.query(Permission).all()],
#             is_editor=True
#         )
#         create_user_service(db, super_admin_data, is_super_admin=True)
#         print("Super Admin created.")
#     db.close()




# # Add to all ModelView classes
# def is_accessible(self, request: Request) -> bool:
#     user = request.state.user
#     if user.is_super_admin:
#         return True
        
#     # Service views require manage_services
#     if self.identity in ["service", "service_content"]:
#         return any(p.name == "manage_services" for p in user.permissions)
        
#     # Blog views require manage_blogs
#     if self.identity in ["blog", "blog_content", "blog_category"]:
#         return any(p.name == "manage_blogs" for p in user.permissions)
        
#     # User/Permission views require manage_users
#     if self.identity in ["user", "permission"]:
#         return any(p.name == "manage_users" for p in user.permissions)
        
#     return False



from fastapi import FastAPI
import os
from utils.db import Base, engine, SessionLocal
from models.user import User, Permission
from models.service import Service, ContentType as ServiceContentType
from models.blog import Blog, BlogCategory, ContentType as BlogContentType
from routes import auth, service, blog, testimonial, social_media
from starlette_admin.contrib.sqla import Admin, ModelView
from schemas.user import UserCreate
from service.auth_service import create_user as create_user_service, get_user_by_email
from starlette_admin import fields
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.staticfiles import StaticFiles
from admin.DatabaseAuthProvider import DatabaseAuthProvider
from fastapi.requests import Request
from utils.auth import hash_password, verify_password
# from starlette_admin.fields import WysiwygField 
from starlette_admin.fields import TinyMCEEditorField
from models.testimonial import Testimonial  
from schemas.testimonial import TestimonialCreate  
from service.testimonial_service import create_testimonial  
from models.social_media import SocialMedia, SocialPlatform  # Add this
from schemas.social_media import SocialMediaCreate  # Add this
from service.social_media_service import create_social_media


app = FastAPI()

# Middleware
app.add_middleware(SessionMiddleware, secret_key="super-secret-session-key")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(service.router)
app.include_router(blog.router)
app.include_router(testimonial.router)
app.include_router(social_media.router)

# Base ModelView with access control
class BaseModelView(ModelView):
    def is_accessible(self, request: Request) -> bool:
        user = getattr(request.state, 'user', None)
        if not user:
            return False
            
        if user.is_super_admin:
            return True
            
        permission_map = {
            "user": "manage_users",
            "permission": "manage_users",
            "service": "manage_services",
            "service_content": "manage_services",
            "blog": "manage_blogs",
            "blog_content": "manage_blogs",
            "blog_category": "manage_blogs",
            "testimonial": "manage_testimonials",
            "social_media": "manage_social_media",
        }
        
        required_perm = permission_map.get(self.identity)
        if not required_perm:
            return False
            
        return any(p.name == required_perm for p in user.permissions)

# Updated View Classes with consistent identities
class UserView(BaseModelView):
    identity = "user"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("username"),
        fields.StringField("email"),
        fields.BooleanField("is_google_account"),
        fields.BooleanField("is_super_admin"),
        fields.BooleanField("is_editor"),
    ]
    exclude_fields_from_list = ["password"]
    exclude_fields_from_detail = ["password"]
    form_include = [
        "username", "email", "password", "is_google_account",
        "is_super_admin", "is_editor"
    ]

class PermissionView(BaseModelView):
    identity = "permission"

# class ServiceView(BaseModelView):
#     identity = "service"
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("title"),
#         fields.StringField("slug"),
#         fields.StringField("meta_description"),
#         fields.BooleanField("is_active"),
#         # Match identity to ServiceContentView
#         fields.HasMany("contents", identity="service_content")
#     ]

class ServiceContentView(BaseModelView):
    identity = "service_content"
    fields = [
        fields.IntegerField("id"),
        fields.IntegerField("service_id"),
        fields.IntegerField("order"),
        fields.EnumField("content_type", enum=ServiceContentType, select2=False),
        fields.StringField("content"),
        fields.StringField("image_url")
    ]

# class BlogView(BaseModelView):
#     identity = "blog"
#     fields = [
#         fields.IntegerField("id"),
#         fields.StringField("title"),
#         fields.StringField("slug"),
#         fields.TextAreaField("meta_description"),
#         fields.BooleanField("is_active"),
#         fields.StringField("featured_image"),
#         fields.DateTimeField("published_at"),
#         fields.HasOne("author", identity="user"),
#         # Match identities to content and category views
#         fields.HasMany("contents", identity="blog_content"),
#         fields.HasMany("categories", identity="blog_category")
#     ]

class BlogView(BaseModelView):
    identity = "blog"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("title"),
        fields.StringField("slug"),
        fields.TextAreaField("meta_description"),
        fields.BooleanField("is_active"),
        fields.StringField("featured_image"),
        fields.DateTimeField("published_at"),
        fields.HasOne("author", identity="user"),
        fields.HasMany("categories", identity="blog_category"),
        # WysiwygField("content")  # Rich text editor
        # TinyMCEEditorField("content")  # Rich text editor
        TinyMCEEditorField(
            "content",
            extra_options={
                "toolbar": (
                    "undo redo | styles | bold italic underline | "
                    "alignleft aligncenter alignright alignjustify | "
                    "outdent indent | formatselect"
                ),
                "menubar": "file edit view insert format",
                "plugins": (
                    "lists link image charmap preview anchor "
                    "searchreplace visualblocks code fullscreen "
                    "insertdatetime media table help wordcount"
                )
            }
        )

    ]

class ServiceView(BaseModelView):
    identity = "service"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("title"),
        fields.StringField("slug"),
        fields.StringField("meta_description"),
        fields.BooleanField("is_active"),
        fields.StringField("image_url"),
        TinyMCEEditorField(
            "content",
            extra_options={
                "toolbar": (
                    "undo redo | styles | bold italic underline | "
                    "alignleft aligncenter alignright alignjustify | "
                    "outdent indent | formatselect"
                ),
                "menubar": "file edit view insert format",
                "plugins": (
                    "lists link image charmap preview anchor "
                    "searchreplace visualblocks code fullscreen "
                    "insertdatetime media table help wordcount"
                )
            }
        )

    ]

class BlogContentView(BaseModelView):
    identity = "blog_content"
    fields = [
        fields.IntegerField("id"),
        fields.IntegerField("blog_id"),
        fields.IntegerField("order"),
        fields.EnumField("content_type", enum=BlogContentType, select2=False),
        fields.TextAreaField("content"),
        fields.StringField("image_url")
    ]

class BlogCategoryView(BaseModelView):
    identity = "blog_category"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("name"),
        fields.StringField("slug"),
        fields.TextAreaField("description")
    ]


class TestimonialView(BaseModelView):
    identity = "testimonial"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("client_name"),
        fields.StringField("client_title"),
        fields.StringField("company"),
        fields.TextAreaField("content"),
        fields.StringField("image_url"),
        fields.BooleanField("is_active"),
        fields.IntegerField("order"),
    ]

class SocialMediaView(BaseModelView):
    identity = "social_media"
    fields = [
        fields.IntegerField("id"),
        fields.EnumField("platform", enum=SocialPlatform, select2=False),
        fields.StringField("url"),
        fields.StringField("icon_class"),
        fields.BooleanField("is_active"),
        fields.IntegerField("order"),
        fields.StringField("alt_text"),
        fields.StringField("title_text"),
    ]

# Admin Setup
admin = Admin(
    engine,
    title="SEO Masterr Admin",
    auth_provider=DatabaseAuthProvider(),
)

admin.add_view(UserView(User, icon="fa fa-user"))
admin.add_view(PermissionView(Permission, icon="fa fa-key"))
admin.add_view(ServiceView(Service, icon="fa fa-server"))
# admin.add_view(ServiceContentView(ServiceContent, icon="fa fa-list"))
admin.add_view(BlogView(Blog, icon="fa fa-newspaper"))
# admin.add_view(BlogContentView(BlogContent, icon="fa fa-list-alt"))
admin.add_view(BlogCategoryView(BlogCategory, icon="fa fa-tag"))
admin.add_view(TestimonialView(Testimonial, icon="fa fa-quote-left"))
admin.add_view(SocialMediaView(SocialMedia, icon="fa fa-share-alt"))

admin.mount_to(app)

# Startup logic
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    required_permissions = [
        ("manage_services", "Manage services content"),
        ("manage_blogs", "Manage blog content"),
        ("manage_users", "Manage users"),
        ("manage_testimonials", "Manage testimonials"),
        ("manage_social_media", "Manage social media links"),
    ]
    for name, desc in required_permissions:
        if not db.query(Permission).filter(Permission.name == name).first():
            db.add(Permission(name=name, description=desc))

    super_admin_email = os.getenv("SUPERADMIN_EMAIL")
    super_admin_password = os.getenv("SUPERADMIN_PASSWORD")
    if super_admin_email and not get_user_by_email(db, super_admin_email):
        super_admin_data = UserCreate(
            username="superadmin",
            email=super_admin_email,
            password=super_admin_password,
            permissions=[p.name for p in db.query(Permission).all()],
            is_editor=True
        )
        create_user_service(db, super_admin_data, is_super_admin=True)
        print("Super Admin created.")
    db.close()
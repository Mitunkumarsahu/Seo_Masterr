from fastapi import FastAPI
import os
from utils.db import Base, engine, SessionLocal
from models.user import User, Permission
from models.service import Service, ServiceType
from models.service import ServiceType
from models.blog import Blog, BlogCategory, ContentType as BlogContentType
from routes import auth, service, blog, testimonial, social_media, home_feature, faq
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
from starlette_admin.exceptions import FormValidationError
from models.testimonial import Testimonial  
from schemas.testimonial import TestimonialCreate  
from service.testimonial_service import create_testimonial  
from models.social_media import SocialMedia, SocialPlatform  # Add this
from schemas.social_media import SocialMediaCreate  # Add this
from service.social_media_service import create_social_media
from models.home_feature import HomeFeature
from models.faq import FAQ
from models.best_works import BestWork
from routes import best_works
from models.why_choose_us import WhyChooseUs
from routes import why_choose_us
from models.process_step import ProcessStep
from routes import process_step
from models.about_hero import AboutHero
from routes import about_hero


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
app.include_router(home_feature.router)
app.include_router(faq.router)
app.include_router(best_works.router)
app.include_router(why_choose_us.router)
app.include_router(process_step.router)
app.include_router(about_hero.router)

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
            "service_type": "manage_services",
            "home_feature": "manage_home_features",
            "faq": "manage_faqs",
            "best_work": "manage_best_works",
            "why_choose_us": "manage_why_choose_us",
            "process_step": "manage_process_steps",
            "about_hero": "manage_about_hero",
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


class ServiceTypeView(BaseModelView):
    identity = "service_type"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("name"),
        fields.StringField("slug"),
        fields.TextAreaField("description"),
        fields.BooleanField("is_active"),
    ]

# Update ServiceView to include service_type relationship
class ServiceView(BaseModelView):
    identity = "service"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("title"),
        fields.StringField("slug"),
        fields.StringField("meta_description"),
        fields.BooleanField("is_active"),
        fields.StringField("image_url"),
        # Add relationship to service type
        fields.HasOne("service_type", identity="service_type"),
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


class HomeFeatureView(BaseModelView):
    identity = "home_feature"
    fields = [
        fields.IntegerField("id", read_only=True),
        fields.IntegerField("position"),
        fields.StringField("heading"),
        fields.TextAreaField("description"),
        fields.StringField("image_url"),
    ]
    
    def can_create(self, request: Request) -> bool:
        return True
    
    def can_delete(self, request: Request) -> bool:
        return True
    
    # Corrected validate method with proper parameters
    async def validate(self, request: Request, data: dict) -> dict:
        """
        Validate feature data
        """
        # Ensure position is between 1-3
        position = data.get("position")
        if position not in [1, 2, 3]:
            raise FormValidationError({"position": "Position must be 1, 2, or 3"})
        
        # Ensure all required fields are present
        required_fields = ["position", "heading", "description", "image_url"]
        for field in required_fields:
            if not data.get(field):
                raise FormValidationError({field: "This field is required"})
                
        return data


class FAQView(BaseModelView):
    identity = "faq"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("question"),
        fields.TextAreaField("answer"),
        fields.IntegerField("order"),
        fields.BooleanField("is_active"),
    ]

class BestWorkView(BaseModelView):
    identity = "best_work"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("title"),
        fields.StringField("image_url"),
        fields.TextAreaField("description"),
        fields.IntegerField("order"),
        fields.BooleanField("is_active"),
    ]
    
class WhyChooseUsView(BaseModelView):
    identity = "why_choose_us"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("heading", required=True),
        fields.TextAreaField("description", required=True),
        fields.StringField("image_url"),
        fields.TextAreaField(
            "points", 
            required=True,
            help_text="Enter each point on a new line"
        ),
        fields.BooleanField("is_active"),
    ]
    
    async def validate(self, request: Request, data: dict) -> dict:
        # Ensure at least one point is provided
        points = data.get("points", "").split("\n")
        if not any(point.strip() for point in points):
            raise FormValidationError({"points": "At least one point is required"})
        return data
 

class ProcessStepView(BaseModelView):
    identity = "process_step"
    fields = [
        fields.IntegerField("id"),
        # fields.StringField("title", required=True),
        fields.StringField("heading", required=True),
        fields.TextAreaField("description", required=True),
        fields.IntegerField("order"),
        fields.BooleanField("is_active"),
    ]


class AboutHeroView(BaseModelView):
    identity = "about_hero"
    fields = [
        fields.IntegerField("id"),
        fields.StringField("title", required=True),
        fields.TextAreaField("description", required=True),
        fields.StringField("image_url"),
        fields.BooleanField("is_active"),
    ]


# Admin Setup
admin = Admin(
    engine,
    title="SEO Masterr Admin",
    auth_provider=DatabaseAuthProvider(),
)

admin.add_view(UserView(User, icon="fa fa-user"))
admin.add_view(PermissionView(Permission, icon="fa fa-key"))
admin.add_view(ServiceTypeView(ServiceType, icon="fa fa-tags"))
admin.add_view(ServiceView(Service, icon="fa fa-server"))
# admin.add_view(ServiceContentView(ServiceContent, icon="fa fa-list"))
admin.add_view(BlogCategoryView(BlogCategory, icon="fa fa-tag"))
admin.add_view(BlogView(Blog, icon="fa fa-newspaper"))
# admin.add_view(BlogContentView(BlogContent, icon="fa fa-list-alt"))
admin.add_view(TestimonialView(Testimonial, icon="fa fa-quote-left"))
admin.add_view(SocialMediaView(SocialMedia, icon="fa fa-share-alt"))
admin.add_view(HomeFeatureView(HomeFeature, icon="fa fa-star", name="Home Features"))
admin.add_view(FAQView(FAQ, icon="fa fa-question-circle", name="FAQs"))
admin.add_view(BestWorkView(BestWork, icon="fa fa-star", name="Best Works"))
admin.add_view(WhyChooseUsView(WhyChooseUs, icon="fa fa-question-circle", name="Why Choose Us"))
admin.add_view(ProcessStepView(ProcessStep, icon="fa fa-list-ol", name="Process Steps"))
admin.add_view(AboutHeroView(AboutHero, icon="fa fa-image", name="About Hero"))

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
        ("manage_home_features", "Manage home features"),
        ("manage_faqs", "Manage FAQs"),
        ("manage_best_works", "Manage Best Works"),
        ("manage_why_choose_us", "Manage Why Choose Us section"),
        ("manage_process_steps", "Manage Process Steps"),
        ("manage_about_hero", "Manage About Page Hero"),
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

    initial_service_types = [
        {"name": "SEO Service", "slug": "seo-service"},
        {"name": "Ads and PPC Service", "slug": "ads-ppc-service"},
        {"name": "SMO Service", "slug": "smo-service"},
    ]
    
    for st in initial_service_types:
        if not db.query(ServiceType).filter(ServiceType.slug == st["slug"]).first():
            db.add(ServiceType(**st))

    db.commit()

    db.close()
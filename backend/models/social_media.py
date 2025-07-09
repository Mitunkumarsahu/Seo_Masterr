from sqlalchemy import Column, Integer, String, Boolean, Enum
from utils.db import Base
import enum

class SocialPlatform(enum.Enum):
    FACEBOOK = "facebook"
    TWITTER = "twitter"
    INSTAGRAM = "instagram"
    LINKEDIN = "linkedin"
    YOUTUBE = "youtube"
    TIKTOK = "tiktok"
    PINTEREST = "pinterest"
    WHATSAPP = "whatsapp"
    SNAPCHAT = "snapchat"

class SocialMedia(Base):
    __tablename__ = "social_media"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(Enum(SocialPlatform), nullable=False)
    url = Column(String(255), nullable=False)
    icon_class = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    alt_text = Column(String(100), nullable=True)
    title_text = Column(String(100), nullable=True)
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Set default icon after platform is initialized
        if not self.icon_class and self.platform:
            self.icon_class = self.get_default_icon()
    
    def get_default_icon(self):
        """Get default Font Awesome icon for the platform"""
        icons = {
            SocialPlatform.FACEBOOK: "fab fa-facebook-f",
            SocialPlatform.TWITTER: "fab fa-twitter",
            SocialPlatform.INSTAGRAM: "fab fa-instagram",
            SocialPlatform.LINKEDIN: "fab fa-linkedin-in",
            SocialPlatform.YOUTUBE: "fab fa-youtube",
            SocialPlatform.TIKTOK: "fab fa-tiktok",
            SocialPlatform.PINTEREST: "fab fa-pinterest-p",
            SocialPlatform.WHATSAPP: "fab fa-whatsapp",
            SocialPlatform.SNAPCHAT: "fab fa-snapchat-ghost",
        }
        return icons.get(self.platform, "fas fa-share-alt")
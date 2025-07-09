from enum import Enum
from pydantic import BaseModel, HttpUrl
from typing import Optional

class SocialPlatform(str, Enum):
    FACEBOOK = "facebook"
    TWITTER = "twitter"
    INSTAGRAM = "instagram"
    LINKEDIN = "linkedin"
    YOUTUBE = "youtube"
    TIKTOK = "tiktok"
    PINTEREST = "pinterest"
    WHATSAPP = "whatsapp"
    SNAPCHAT = "snapchat"

class SocialMediaBase(BaseModel):
    platform: SocialPlatform
    url: HttpUrl
    icon_class: Optional[str] = None
    is_active: bool = True
    order: int = 0
    alt_text: Optional[str] = None
    title_text: Optional[str] = None

class SocialMediaCreate(SocialMediaBase):
    pass

class SocialMediaOut(SocialMediaBase):
    id: int

    class Config:
        from_attributes = True
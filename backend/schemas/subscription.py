from pydantic import BaseModel, EmailStr
from datetime import datetime

class SubscriptionBase(BaseModel):
    email: EmailStr

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionOut(SubscriptionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
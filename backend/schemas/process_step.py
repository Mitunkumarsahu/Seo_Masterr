from pydantic import BaseModel
from typing import Optional

class ProcessStepBase(BaseModel):
    # title: str
    heading: str
    description: str
    order: int = 0
    is_active: bool = True

class ProcessStepCreate(ProcessStepBase):
    pass

class ProcessStepOut(ProcessStepBase):
    id: int

    class Config:
        from_attributes = True
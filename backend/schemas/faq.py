from pydantic import BaseModel

class FAQBase(BaseModel):
    question: str
    answer: str
    order: int = 0
    is_active: bool = True

class FAQCreate(FAQBase):
    pass

class FAQOut(FAQBase):
    id: int

    class Config:
        from_attributes = True
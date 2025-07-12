from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from utils.db import get_db
from service.subscription_service import send_bulk_emails
from models.user import User
from routes.auth import require_permission
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["Admin"])

class BulkEmailRequest(BaseModel):
    subject: str
    body: str

@router.post("/send-bulk-email")
def admin_send_bulk_email(
    request: BulkEmailRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_subscriptions"))
):
    return send_bulk_emails(
        db,
        subject=request.subject,
        body=request.body,
        background_tasks=background_tasks
    )
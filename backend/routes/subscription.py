from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.subscription import SubscriptionCreate, SubscriptionOut
from service.subscription_service import (
    create_subscription,
    get_subscription,
    get_all_subscriptions,
    delete_subscription
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])

# Public endpoint for subscribing
@router.post("/", response_model=SubscriptionOut, status_code=status.HTTP_201_CREATED)
def subscribe(
    subscription: SubscriptionCreate,
    db: Session = Depends(get_db)
):
    return create_subscription(db, subscription)

# Admin-only endpoints
@router.get("/", response_model=list[SubscriptionOut])
def list_subscriptions(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_subscriptions"))
):
    return get_all_subscriptions(db)

@router.delete("/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subscription(
    subscription_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_subscriptions"))
):
    if not delete_subscription(db, subscription_id):
        raise HTTPException(status_code=404, detail="Subscription not found")
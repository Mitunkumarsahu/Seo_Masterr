from sqlalchemy.orm import Session
from models.subscription import Subscription
from schemas.subscription import SubscriptionCreate
from fastapi import HTTPException, status
from utils.email import send_email
from typing import List
from fastapi import BackgroundTasks

def create_subscription(db: Session, subscription: SubscriptionCreate):
    # Check if email already exists
    existing = db.query(Subscription).filter(
        Subscription.email == subscription.email
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already subscribed"
        )
    
    db_subscription = Subscription(email=subscription.email)
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def get_subscription(db: Session, subscription_id: int):
    return db.query(Subscription).filter(Subscription.id == subscription_id).first()

def get_all_subscriptions(db: Session):
    return db.query(Subscription).order_by(Subscription.created_at.desc()).all()

def delete_subscription(db: Session, subscription_id: int):
    subscription = get_subscription(db, subscription_id)
    if subscription:
        db.delete(subscription)
        db.commit()
        return True
    return False


def send_bulk_emails(
    db: Session, 
    subject: str,
    body: str,
    background_tasks: BackgroundTasks
):
    """Send emails to all subscribers in background"""
    subscriptions = db.query(Subscription).all()
    for subscription in subscriptions:
        background_tasks.add_task(
            send_email,
            recipient=subscription.email,
            subject=subject,
            body=body
        )
    return {"message": f"Emails being sent to {len(subscriptions)} subscribers"}
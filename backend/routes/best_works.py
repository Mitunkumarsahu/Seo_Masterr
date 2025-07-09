from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.best_works import BestWorkCreate, BestWorkOut
from service.best_works_service import create_best_work, get_best_work, get_all_best_works, update_best_work, delete_best_work
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/best-works", tags=["Best Works"])

@router.post("/", response_model=BestWorkOut)
def create_new_work(
    work: BestWorkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_best_works"))
):
    return create_best_work(db, work)

@router.get("/", response_model=list[BestWorkOut])
def list_works(active_only: bool = False, db: Session = Depends(get_db)):
    return get_all_best_works(db, active_only)

@router.get("/{work_id}", response_model=BestWorkOut)
def get_work_by_id(work_id: int, db: Session = Depends(get_db)):
    work = get_best_work(db, work_id)
    if not work:
        raise HTTPException(status_code=404, detail="Work not found")
    return work

@router.put("/{work_id}", response_model=BestWorkOut)
def update_existing_work(
    work_id: int,
    work: BestWorkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_best_works"))
):
    updated = update_best_work(db, work_id, work)
    if not updated:
        raise HTTPException(status_code=404, detail="Work not found")
    return updated

@router.delete("/{work_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_work(
    work_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_best_works"))
):
    if not delete_best_work(db, work_id):
        raise HTTPException(status_code=404, detail="Work not found")
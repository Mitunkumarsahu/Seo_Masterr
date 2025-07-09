from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.process_step import ProcessStepCreate, ProcessStepOut
from service.process_step_service import (
    create_process_step,
    get_process_step,
    get_all_process_steps,
    update_process_step,
    delete_process_step
)
from utils.db import get_db
from models.user import User
from routes.auth import require_permission

router = APIRouter(prefix="/process-steps", tags=["Process Steps"])

@router.post("/", response_model=ProcessStepOut)
def create_step(
    step: ProcessStepCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_process_steps"))
):
    return create_process_step(db, step)

@router.get("/", response_model=list[ProcessStepOut])
def list_steps(active_only: bool = False, db: Session = Depends(get_db)):
    return get_all_process_steps(db, active_only)

@router.get("/{step_id}", response_model=ProcessStepOut)
def get_step_by_id(step_id: int, db: Session = Depends(get_db)):
    step = get_process_step(db, step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    return step

@router.put("/{step_id}", response_model=ProcessStepOut)
def update_step(
    step_id: int,
    step: ProcessStepCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_process_steps"))
):
    updated = update_process_step(db, step_id, step)
    if not updated:
        raise HTTPException(status_code=404, detail="Step not found")
    return updated

@router.delete("/{step_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_step(
    step_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_process_steps"))
):
    if not delete_process_step(db, step_id):
        raise HTTPException(status_code=404, detail="Step not found")
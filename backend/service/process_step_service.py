from sqlalchemy.orm import Session
from models.process_step import ProcessStep
from schemas.process_step import ProcessStepCreate

def create_process_step(db: Session, step: ProcessStepCreate):
    db_step = ProcessStep(**step.dict())
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step

def get_process_step(db: Session, step_id: int):
    return db.query(ProcessStep).filter(ProcessStep.id == step_id).first()

def get_all_process_steps(db: Session, active_only: bool = False):
    query = db.query(ProcessStep)
    if active_only:
        query = query.filter(ProcessStep.is_active == True)
    return query.order_by(ProcessStep.order).all()

def update_process_step(db: Session, step_id: int, step: ProcessStepCreate):
    db_step = get_process_step(db, step_id)
    if not db_step:
        return None
    
    for key, value in step.dict().items():
        setattr(db_step, key, value)
    
    db.commit()
    db.refresh(db_step)
    return db_step

def delete_process_step(db: Session, step_id: int):
    db_step = get_process_step(db, step_id)
    if db_step:
        db.delete(db_step)
        db.commit()
        return True
    return False
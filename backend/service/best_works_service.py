from sqlalchemy.orm import Session
from models.best_works import BestWork
from schemas.best_works import BestWorkCreate

def create_best_work(db: Session, work: BestWorkCreate):
    db_work = BestWork(**work.dict())
    db.add(db_work)
    db.commit()
    db.refresh(db_work)
    return db_work

def get_best_work(db: Session, work_id: int):
    return db.query(BestWork).filter(BestWork.id == work_id).first()

def get_all_best_works(db: Session, active_only: bool = False):
    query = db.query(BestWork)
    if active_only:
        query = query.filter(BestWork.is_active == True)
    return query.order_by(BestWork.order).all()

def update_best_work(db: Session, work_id: int, work: BestWorkCreate):
    db_work = get_best_work(db, work_id)
    if not db_work:
        return None
    
    for key, value in work.dict().items():
        setattr(db_work, key, value)
    
    db.commit()
    db.refresh(db_work)
    return db_work

def delete_best_work(db: Session, work_id: int):
    db_work = get_best_work(db, work_id)
    if db_work:
        db.delete(db_work)
        db.commit()
        return True
    return False
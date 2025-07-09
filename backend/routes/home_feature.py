from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.home_feature import HomeFeatureCreate, HomeFeatureOut
from service.home_feature_service import create_or_update_feature, get_all_features, get_features_by_position
from utils.db import get_db
from models.user import User
from models.home_feature import HomeFeature
from routes.auth import require_permission

router = APIRouter(prefix="/home-features", tags=["Home Features"])

@router.post("/", response_model=list[HomeFeatureOut])
def update_features(
    features: list[HomeFeatureCreate],
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_home_features"))
):
    # Must have exactly 3 items
    if len(features) != 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Exactly 3 features are required"
        )
    
    # Update all features
    results = []
    for feature in features:
        results.append(create_or_update_feature(db, feature))
    
    # Return updated list
    return get_all_features(db)

@router.get("/", response_model=list[HomeFeatureOut])
def get_features(db: Session = Depends(get_db)):
    return get_all_features(db)

@router.get("/positions", response_model=dict[int, HomeFeatureOut])
def get_features_by_position_endpoint(db: Session = Depends(get_db)):
    return get_features_by_position(db)


# want update and delete endpoints
@router.put("/{position}", response_model=HomeFeatureOut)
def update_feature(
    position: int,
    feature_data: HomeFeatureCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_home_features"))
):
    if position not in [1, 2, 3]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Position must be 1, 2, or 3"
        )
    
    feature_data.position = position
    return create_or_update_feature(db, feature_data)


@router.delete("/{position}", status_code=status.HTTP_204_NO_CONTENT)
def delete_feature(
    position: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission("manage_home_features"))
):
    if position not in [1, 2, 3]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Position must be 1, 2, or 3"
        )
    
    # Check if feature exists
    feature = db.query(HomeFeature).filter(HomeFeature.position == position).first()
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    
    db.delete(feature)
    db.commit()
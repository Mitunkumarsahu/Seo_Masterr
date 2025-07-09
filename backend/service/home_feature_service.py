from sqlalchemy.orm import Session
from models.home_feature import HomeFeature
from fastapi import HTTPException, status
from schemas.home_feature import HomeFeatureCreate

def create_or_update_feature(db: Session, feature_data: HomeFeatureCreate):
    # Position must be between 1-3
    if feature_data.position not in [1, 2, 3]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Position must be 1, 2, or 3"
        )
    
    # Check if feature exists for this position
    existing = db.query(HomeFeature).filter(
        HomeFeature.position == feature_data.position
    ).first()
    
    if existing:
        # Update existing
        existing.heading = feature_data.heading
        existing.description = feature_data.description
        existing.image_url = feature_data.image_url
    else:
        # Create new
        db_feature = HomeFeature(**feature_data.dict())
        db.add(db_feature)
    
    db.commit()
    
    # Return all features
    return get_all_features(db)

def get_all_features(db: Session):
    return db.query(HomeFeature).order_by(HomeFeature.position).all()

def get_features_by_position(db: Session):
    features = {1: None, 2: None, 3: None}
    for feature in get_all_features(db):
        features[feature.position] = feature
    return features
from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from app.services.analysis_service import analyze_failure_data

from app.analytics.metrics import calculate_mtbf
router = APIRouter()


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    df = pd.read_csv(file.file)

    required_columns = [
        "asset_id",
        "time_to_failure"
    ]

    missing = [
        col
        for col in required_columns
        if col not in df.columns
    ]

    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Missing columns: {missing}"
        )

    result = analyze_failure_data(df)

    return result
    
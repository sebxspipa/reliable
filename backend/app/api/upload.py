from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
from app.services.analysis_service import analyze_failure_data
from app.services.csv_validation import validate_failure_csv

router = APIRouter()


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed.",
        )

    try:
        df = pd.read_csv(file.file)
    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="CSV file is empty.",
        ) from None
    except Exception:
        raise HTTPException(
            status_code=400,
            detail=(
                "Could not parse CSV file. "
                "Use comma-separated values with a header row."
            ),
        ) from None

    try:
        df = validate_failure_csv(df)
    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from None

    return analyze_failure_data(df)

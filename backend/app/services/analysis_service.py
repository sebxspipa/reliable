import pandas as pd

from app.analytics.metrics import calculate_mtbf


def analyze_failure_data(df: pd.DataFrame):
    
    mtbf = calculate_mtbf(df)

    return {
        "status": "success",
        "rows": len(df),
        "columns": list(df.columns),
        "mtbf": mtbf
    }
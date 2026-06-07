import pandas as pd
from app.analytics.weibull import calculate_weibull
from app.analytics.recommendations import interpret_beta
from app.analytics.metrics import calculate_mtbf


def analyze_failure_data(df: pd.DataFrame):
    
    mtbf = calculate_mtbf(df)
    beta, eta = calculate_weibull(df)

    failure_pattern = interpret_beta(beta)
    
    return {
        "status": "success",
        "rows": len(df),
        "columns": list(df.columns),
        "mtbf": mtbf,
        "beta": beta,
        "eta": eta,
        "failure_pattern": failure_pattern
    }
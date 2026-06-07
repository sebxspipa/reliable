import pandas as pd
from app.analytics.weibull import calculate_weibull
from app.analytics.charts import generate_weibull_charts
from app.analytics.recommendations import (
    interpret_beta,
    get_recommendation,
)
from app.analytics.metrics import calculate_mtbf
from app.analytics.reliability import (
    calculate_b10_life,
    calculate_reliability_targets,
)
from app.analytics.sample_quality import (
    build_model_quality,
    build_sample_warning,
)


def analyze_failure_data(df: pd.DataFrame):
    sample_size = len(df)

    mtbf = calculate_mtbf(df)
    beta, eta = calculate_weibull(df)

    failure_pattern = interpret_beta(beta)
    recommendation = get_recommendation(beta, sample_size)
    b10_life = round(calculate_b10_life(beta, eta), 1)
    reliability_targets = calculate_reliability_targets(beta, eta)

    failure_times = [
        float(value)
        for value in df["time_to_failure"].to_numpy()
    ]
    charts = generate_weibull_charts(failure_times, beta, eta)

    return {
        "status": "success",
        "rows": sample_size,
        "columns": list(df.columns),
        "mtbf": mtbf,
        "beta": beta,
        "eta": eta,
        "b10_life": b10_life,
        "failure_pattern": failure_pattern,
        "recommendation": recommendation,
        "reliability_targets": reliability_targets,
        "sample_warning": build_sample_warning(sample_size),
        "model_quality": build_model_quality(df, sample_size),
        "charts": charts,
    }

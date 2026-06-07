import pandas as pd
from scipy.stats import weibull_min
from typing import cast


def calculate_weibull(df: pd.DataFrame) -> tuple[float, float]:
    """
    Returns:
        beta (shape)
        eta (scale)
    """

    data = df["time_to_failure"]

    beta, loc, eta = weibull_min.fit(
        data,
        floc=0
    )

    return round(cast(float, beta), 3), round(cast(float, eta), 3)
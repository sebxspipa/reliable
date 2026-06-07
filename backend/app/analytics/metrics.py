import pandas as pd
import numpy as np


def calculate_mtbf(df: pd.DataFrame) -> float:
    """
    Mean Time Between Failures
    """

    return round(
        float(np.mean(df["time_to_failure"].to_numpy())),
        2
    )
import numpy as np
from scipy.stats import weibull_min
from typing import cast


def generate_weibull_charts(
    failure_times: list[float],
    beta: float,
    eta: float,
    points: int = 200,
) -> dict:
    t_max = max(failure_times) * 1.25 if failure_times else eta * 2
    t_values = np.linspace(0.1, t_max, points)

    reliability_curve = []
    pdf_curve = []

    for t in t_values:
        reliability_curve.append({
            "t": round(float(t), 2),
            "reliability": round(
                float(weibull_min.sf(t, beta, loc=0, scale=eta)),
                6,
            ),
        })
        pdf_curve.append({
            "t": round(float(t), 2),
            "pdf": round(
                float(weibull_min.pdf(t, beta, loc=0, scale=eta)),
                8,
            ),
        })

    sorted_times = sorted(failure_times)
    n = len(sorted_times)
    failure_points = []

    for i, t in enumerate(sorted_times, start=1):
        failure_fraction = cast(float, (i - 0.3) / (n + 0.4))
        failure_points.append({
            "t": round(t, 2),
            "failure_fraction": round(failure_fraction, 4),
        })

    return {
        "reliability_curve": reliability_curve,
        "pdf_curve": pdf_curve,
        "failure_points": failure_points,
    }

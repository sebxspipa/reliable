import math


def reliability_target_time(
    beta: float,
    eta: float,
    reliability: float,
) -> float:
    """Time t at which survival probability R(t) equals reliability."""
    return eta * (-math.log(reliability)) ** (1 / beta)


def calculate_b10_life(beta: float, eta: float) -> float:
    """B10 life: time at which 10% of the population has failed."""
    return reliability_target_time(beta, eta, 0.90)


def calculate_reliability_targets(
    beta: float,
    eta: float,
) -> list[dict]:
    targets = [
        (0.90, "R = 90%"),
        (0.80, "R = 80%"),
        (0.50, "R = 50%"),
    ]

    return [
        {
            "reliability": reliability,
            "label": label,
            "time": round(reliability_target_time(beta, eta, reliability), 1),
        }
        for reliability, label in targets
    ]

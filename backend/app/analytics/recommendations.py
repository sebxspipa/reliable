def interpret_beta(beta: float) -> str:
    if beta < 0.8:
        return "Early failures dominant"

    if beta < 1.2:
        return "Approximately exponential (constant failure rate)"

    if beta < 3:
        return "Moderate wear-out"

    if beta < 5:
        return "Strong wear-out"

    return "Failures highly concentrated in a narrow time window"


def get_recommendation(beta: float, sample_size: int) -> str:
    if beta < 0.8:
        recommendation = (
            "Investigate commissioning, installation, or manufacturing "
            "issues. Early-life failures suggest defects or startup stress."
        )
    elif beta < 1.2:
        recommendation = (
            "Failure rate appears approximately constant. Focus on condition "
            "monitoring, operational discipline, and root-cause analysis "
            "rather than age-based replacement."
        )
    elif beta < 3:
        recommendation = (
            "Moderate wear-out behavior detected. Define inspection intervals "
            "and plan component renewal based on operating age."
        )
    elif beta < 5:
        recommendation = (
            "Strong wear-out pattern. Preventive replacement planning is "
            "recommended before the failure window narrows further."
        )
    else:
        recommendation = (
            "Failures are highly concentrated in a narrow time window. "
            "Excellent candidate for preventive replacement — failures are "
            "not random. Schedule renewal before the predicted failure cluster."
        )

    if sample_size < 10:
        recommendation += (
            " Estimates are based on a very small sample; validate with "
            "additional failure history before critical maintenance decisions."
        )
    elif sample_size < 20:
        recommendation += (
            " Sample size is limited; treat parameter estimates as indicative."
        )

    return recommendation

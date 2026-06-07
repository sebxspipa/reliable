import pandas as pd


def assess_confidence(sample_size: int) -> str:
    if sample_size < 10:
        return "Very Low"

    if sample_size < 20:
        return "Low"

    if sample_size < 50:
        return "Moderate"

    return "Good"


def assess_weibull_fit(sample_size: int) -> str:
    if sample_size < 20:
        return "Preliminary"

    if sample_size < 50:
        return "Moderate"

    return "Good"


def detect_censored_data(df: pd.DataFrame) -> tuple[bool, int]:
    if "status" not in df.columns:
        return False, 0

    censored_count = int(
        df["status"]
        .astype(str)
        .str.lower()
        .eq("censored")
        .sum()
    )
    return censored_count > 0, censored_count


def build_sample_warning(sample_size: int) -> dict:
    confidence = assess_confidence(sample_size)

    return {
        "show": sample_size < 20,
        "title": "Sample Size Warning",
        "message": (
            f"Only {sample_size} failure{'s' if sample_size != 1 else ''} "
            "were analyzed. Weibull parameter estimates derived from small "
            "samples may exhibit significant uncertainty. "
            "Interpret results with caution."
        ),
        "confidence": confidence,
    }


def build_model_quality(
    df: pd.DataFrame,
    sample_size: int,
) -> dict:
    has_censored, censored_count = detect_censored_data(df)

    if has_censored:
        censored_label = f"Yes ({censored_count} suspensions detected, not yet modeled)"
    else:
        censored_label = "No"

    return {
        "sample_size": sample_size,
        "confidence": assess_confidence(sample_size),
        "censored_data": censored_label,
        "weibull_fit": assess_weibull_fit(sample_size),
    }

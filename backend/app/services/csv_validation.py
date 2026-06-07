import pandas as pd

REQUIRED_COLUMNS = ["asset_id", "time_to_failure"]
MIN_FAILURES = 2


def validate_failure_csv(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        raise ValueError("CSV file is empty.")

    missing = [
        column
        for column in REQUIRED_COLUMNS
        if column not in df.columns
    ]

    if missing:
        raise ValueError(
            "Missing required columns: "
            f"{', '.join(missing)}. "
            "Expected columns: asset_id, time_to_failure."
        )

    cleaned = df.dropna(subset=REQUIRED_COLUMNS, how="all").copy()

    if len(cleaned) < MIN_FAILURES:
        raise ValueError(
            f"At least {MIN_FAILURES} failure records are required. "
            f"Found {len(cleaned)}."
        )

    time_to_failure = pd.to_numeric(
        cleaned["time_to_failure"],
        errors="coerce",
    )
    invalid_rows = time_to_failure.isna()

    if invalid_rows.any():
        csv_rows = [
            int(index) + 2
            for index in invalid_rows[invalid_rows].index.tolist()[:5]
        ]
        raise ValueError(
            "time_to_failure must be a positive number. "
            f"Invalid values near CSV row(s): {csv_rows}."
        )

    if (time_to_failure <= 0).any():
        raise ValueError(
            "time_to_failure must be greater than zero."
        )

    cleaned["time_to_failure"] = time_to_failure
    cleaned["asset_id"] = cleaned["asset_id"].astype(str).str.strip()

    if cleaned["asset_id"].eq("").any():
        raise ValueError("asset_id cannot be empty.")

    return cleaned

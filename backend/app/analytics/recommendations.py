def interpret_beta(beta: float) -> str:

    if beta < 1:
        return "Early-life failures"

    if beta < 1.5:
        return "Random failures"

    return "Wear-out failures"
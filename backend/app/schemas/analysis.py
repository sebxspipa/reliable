from pydantic import BaseModel


class AnalysisResponse(BaseModel):
    status: str
    rows: int
    columns: list[str]
    mtbf: float
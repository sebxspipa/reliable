export interface AnalysisResponse {
    status: string;
    rows: number;
    columns: string[];
    mtbf: number;
    beta: number;
    eta: number;
    failure_pattern: string;
  }
export interface ReliabilityPoint {
  t: number;
  reliability: number;
}

export interface PdfPoint {
  t: number;
  pdf: number;
}

export interface FailurePoint {
  t: number;
  failure_fraction: number;
}

export interface ChartData {
  reliability_curve: ReliabilityPoint[];
  pdf_curve: PdfPoint[];
  failure_points: FailurePoint[];
}

export interface ReliabilityTarget {
  reliability: number;
  label: string;
  time: number;
}

export interface SampleWarning {
  show: boolean;
  title: string;
  message: string;
  confidence: string;
}

export interface ModelQuality {
  sample_size: number;
  confidence: string;
  censored_data: string;
  weibull_fit: string;
}

export interface AnalysisResponse {
  status: string;
  rows: number;
  columns: string[];
  mtbf: number;
  beta: number;
  eta: number;
  b10_life: number;
  failure_pattern: string;
  recommendation: string;
  reliability_targets: ReliabilityTarget[];
  sample_warning: SampleWarning;
  model_quality: ModelQuality;
  charts: ChartData;
}

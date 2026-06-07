import type { AnalysisResponse } from "@/types/analysis";

export function isAnalysisResponse(data: unknown): data is AnalysisResponse {
  if (!data || typeof data !== "object") {
    return false;
  }

  const response = data as Record<string, unknown>;

  return (
    typeof response.mtbf === "number" &&
    typeof response.beta === "number" &&
    typeof response.eta === "number" &&
    typeof response.b10_life === "number" &&
    typeof response.failure_pattern === "string" &&
    typeof response.recommendation === "string" &&
    Array.isArray(response.reliability_targets) &&
    response.sample_warning != null &&
    response.model_quality != null &&
    response.charts != null
  );
}

import type { ReactNode } from "react";
import type { AnalysisResponse } from "@/types/analysis";

interface AnalysisInsightsProps {
  result: AnalysisResponse;
}

function confidenceColor(confidence: string) {
  switch (confidence) {
    case "Very Low":
    case "Low":
      return "text-amber-700";
    case "Moderate":
      return "text-primary";
    default:
      return "text-primary";
  }
}

function InsightCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary-border bg-surface p-6 shadow-sm">
      <h3 className="font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

export default function AnalysisInsights({ result }: AnalysisInsightsProps) {
  return (
    <div className="space-y-6">
      {result.sample_warning?.show && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900">
            {result.sample_warning.title}
          </h3>

          <p className="mt-2 text-sm text-amber-800">
            {result.sample_warning.message}
          </p>
        </div>
      )}

      <InsightCard title="Model Quality">
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Sample Size</dt>
            <dd className="font-medium text-foreground">
              {result.model_quality?.sample_size ?? result.rows}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted">Confidence</dt>
            <dd
              className={`font-medium ${confidenceColor(result.model_quality?.confidence ?? "Moderate")}`}
            >
              {result.model_quality?.confidence ?? "Unknown"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted">Censored Data</dt>
            <dd className="font-medium text-foreground">
              {result.model_quality?.censored_data ?? "No"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-muted">Weibull Fit</dt>
            <dd className="font-medium text-foreground">
              {result.model_quality?.weibull_fit ?? "Unknown"}
            </dd>
          </div>
        </dl>
      </InsightCard>

      <InsightCard title="Failure Pattern">
        <p className="mt-2 text-foreground">{result.failure_pattern}</p>

        <p className="mt-3 text-sm text-muted">
          β = {result.beta}. Shape parameter interpretation follows standard
          reliability engineering practice; results should be read together
          with sample size and model quality.
        </p>
      </InsightCard>

      <InsightCard title="Reliability Targets">
        <p className="mt-2 text-sm text-muted">
          Operating time by which the target fraction of the population is
          expected to remain in service.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary-border">
                <th className="py-2 font-semibold text-foreground">Target</th>
                <th className="py-2 font-semibold text-foreground">Time (h)</th>
              </tr>
            </thead>
            <tbody>
              {(result.reliability_targets ?? []).map((target) => (
                <tr
                  key={target.label}
                  className="border-b border-primary-border last:border-0"
                >
                  <td className="py-2 text-muted">{target.label}</td>
                  <td className="py-2 font-medium text-primary">
                    {target.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InsightCard>

      <InsightCard title="Executive Summary & Maintenance Recommendation">
        <p className="mt-2 leading-relaxed text-foreground">
          Based on the analysis of {result.rows} failure records, the Weibull distribution
          analysis reveals a shape parameter (β) of {result.beta.toFixed(2)}, indicating
          {result.failure_pattern.toLowerCase()}. The characteristic life (η) is
          {result.eta.toFixed(1)} hours, with an MTBF of {result.mtbf.toFixed(1)} hours.
        </p>
        <p className="mt-2 leading-relaxed text-foreground">
          {result.recommendation}
        </p>
      </InsightCard>
    </div>
  );
}

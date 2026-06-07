"use client";

import { useRef, useState } from "react";
import CsvFormatHelp from "@/components/CsvFormatHelp";
import MetricCard from "@/components/MetricCard";
import AnalysisInsights from "@/components/AnalysisInsights";
import WeibullChart from "@/components/WeibullChart";
import type { AnalysisResponse } from "@/types/analysis";
import { isAnalysisResponse } from "@/lib/analysis";
import { formatApiError } from "@/lib/apiErrors";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function isCsvFile(file: File) {
  return file.name.toLowerCase().endsWith(".csv");
}

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  function selectFile(selected: File | null) {
    if (!selected) {
      return;
    }

    if (!isCsvFile(selected)) {
      setError("Only CSV files are allowed.");
      setFile(null);
      setResult(null);
      return;
    }

    setFile(selected);
    setError(null);
    setResult(null);
  }

  function handleReset() {
    setFile(null);
    setResult(null);
    setError(null);
    setIsDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleUpload() {
    if (!file) {
      setError("Select a CSV file first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(formatApiError(data.detail));
        return;
      }

      if (!isAnalysisResponse(data)) {
        setError(
          "Unexpected API response. Restart the backend and try again."
        );
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        "Could not reach the API. Make sure the backend is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  }

  const canReset = Boolean(file || result || error);

  function handleDownloadReport() {
    if (!result) {
      return;
    }

    // TODO: connect LaTeX PDF generation endpoint.
  }

  return (
    <div className="space-y-6">
      <CsvFormatHelp />

      <div className="space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => selectFile(e.target.files?.[0] ?? null)}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            selectFile(e.dataTransfer.files[0] ?? null);
          }}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary-light"
              : "border-primary-border bg-surface hover:border-primary hover:bg-primary-light/50"
          }`}
        >
          <p className="text-lg font-medium text-foreground">
            Drop CSV here
          </p>

          <p className="mt-2 text-sm text-muted">
            or click to browse
          </p>

          {file && (
            <p className="mt-4 text-sm font-medium text-primary">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !file}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={!canReset || loading}
            className="rounded-lg border border-primary-border bg-surface px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={handleDownloadReport}
            disabled={!result || loading}
            className="rounded-lg border border-primary bg-surface px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            Download Report
          </button>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}

        {result && (
          <div className="space-y-6 pt-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Analysis Results
            </h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                title="MTBF"
                value={`${result.mtbf}`}
              />

              <MetricCard
                title="Beta (β)"
                value={result.beta}
              />

              <MetricCard
                title="Eta (η)"
                value={result.eta}
              />

              <MetricCard
                title="B10 Life"
                value={`${result.b10_life} h`}
              />
            </div>

            {result.charts && <WeibullChart charts={result.charts} />}

            <AnalysisInsights result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { AnalysisResponse } from "@/types/analysis";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        setError(data.detail ?? "Upload failed.");
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

  return (
    <div className="mt-8 space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setError(null);
          setResult(null);
        }}
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={loading}
        className="border px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {result && (
        <div className="mt-6 border rounded p-4">
          <h2 className="text-xl font-bold mb-4">
            Analysis Results
          </h2>

          <p>MTBF: {result.mtbf}</p>

          <p>Beta: {result.beta}</p>

          <p>Eta: {result.eta}</p>

          <p>
            Failure Pattern: {result.failure_pattern}
          </p>
        </div>
      )}
    </div>
  );
}

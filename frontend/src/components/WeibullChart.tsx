"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "@/types/analysis";

const CHART_HEIGHT = 288;
const CHART_PRIMARY = "#2563eb";
const CHART_SECONDARY = "#60a5fa";
const CHART_POINTS = "#1d4ed8";
const CHART_GRID = "#dbeafe";

interface WeibullChartProps {
  charts: ChartData;
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary-border bg-surface p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-foreground">{title}</h3>
      <div className="h-72 w-full min-w-0">{children}</div>
    </div>
  );
}

export default function WeibullChart({ charts }: WeibullChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cdfCurve = charts.reliability_curve.map((point) => ({
    t: point.t,
    failure_fraction: Number((1 - point.reliability).toFixed(4)),
  }));

  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Reliability Function R(t)">
          <div className="h-full animate-pulse rounded bg-primary-muted" />
        </ChartCard>
        <ChartCard title="Probability Density f(t)">
          <div className="h-full animate-pulse rounded bg-primary-muted" />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Cumulative Failure F(t)">
            <div className="h-full animate-pulse rounded bg-primary-muted" />
          </ChartCard>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Reliability Function R(t)">
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <LineChart data={charts.reliability_curve}>
            <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              stroke="#64748b"
              label={{ value: "Time", position: "insideBottom", offset: -4 }}
            />
            <YAxis
              domain={[0, 1]}
              stroke="#64748b"
              label={{
                value: "Reliability",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="reliability"
              name="R(t)"
              stroke={CHART_PRIMARY}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Probability Density f(t)">
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <LineChart data={charts.pdf_curve}>
            <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              stroke="#64748b"
              label={{ value: "Time", position: "insideBottom", offset: -4 }}
            />
            <YAxis
              stroke="#64748b"
              label={{ value: "Density", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pdf"
              name="f(t)"
              stroke={CHART_SECONDARY}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="lg:col-span-2">
        <ChartCard title="Cumulative Failure F(t)">
          <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
            <ComposedChart data={cdfCurve}>
              <CartesianGrid stroke={CHART_GRID} strokeDasharray="3 3" />
              <XAxis
                dataKey="t"
                stroke="#64748b"
                label={{ value: "Time", position: "insideBottom", offset: -4 }}
              />
              <YAxis
                domain={[0, 1]}
                stroke="#64748b"
                label={{
                  value: "F(t)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="failure_fraction"
                name="Fitted Weibull"
                stroke={CHART_PRIMARY}
                strokeWidth={2}
                dot={false}
              />
              <Scatter
                name="Observed failures"
                data={charts.failure_points}
                dataKey="failure_fraction"
                fill={CHART_POINTS}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
}

export default function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-primary-border bg-surface p-6 shadow-sm">
      <p className="text-sm font-medium text-muted">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-primary">
        {value}
      </p>
    </div>
  );
}

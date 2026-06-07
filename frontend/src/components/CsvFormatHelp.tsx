export default function CsvFormatHelp() {
  return (
    <div className="rounded-xl border border-primary-border bg-primary-light p-6 text-sm">
      <h3 className="font-semibold text-foreground">
        Required CSV format
      </h3>

      <p className="mt-2 text-muted">
        Upload a comma-separated file with one row per recorded failure.
        Each row must include the asset identifier and the operating time
        until that failure occurred.
      </p>

      <div className="mt-4 overflow-x-auto rounded-lg border border-primary-border bg-surface p-4 font-mono text-xs text-foreground">
        <pre>{`asset_id,time_to_failure
Motor,2041.20
Motor,4074.71
Motor,6234.82`}</pre>
      </div>

      <ul className="mt-4 list-disc space-y-1 pl-5 text-muted">
        <li>
          <strong className="text-foreground">asset_id</strong> — equipment
          or component name (text)
        </li>
        <li>
          <strong className="text-foreground">time_to_failure</strong> —
          positive number in hours (or your time unit)
        </li>
        <li>Minimum 2 failure records required</li>
        <li>One row = one complete failure event</li>
        <li>
          Suspended/censored data is not modeled yet — include only
          completed failures for now
        </li>
      </ul>

      <p className="mt-4 text-muted">
        Sample file in this repository:{" "}
        <code className="rounded border border-primary-border bg-surface px-1.5 py-0.5 text-foreground">
          examples/sample_failure_data.csv
        </code>
      </p>
    </div>
  );
}

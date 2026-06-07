import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-primary-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            R
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Reliable
            </h1>
            <p className="text-sm text-muted">
              Weibull reliability analysis
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Failure data analysis
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Upload failure history as a CSV file to calculate MTBF, fit a
            Weibull distribution, and receive maintenance recommendations.
          </p>
        </section>

        <UploadForm />
      </main>
    </div>
  );
}

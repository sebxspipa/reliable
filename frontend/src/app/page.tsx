import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        ReliData
      </h1>

      <p className="mt-4">
        Upload failure data and get reliability insights.
      </p>

      <UploadForm />
    </main>
  );
}
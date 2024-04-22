import { LoadingSpinner } from "@dub/ui";

export default function ProjectAnalyticsPlacholder() {
  return (
    <div className="flex h-80 w-full flex-col items-center justify-center space-y-4">
      <LoadingSpinner />
      <p className="text-sm text-gray-500">Loading analytics...</p>
    </div>
  );
}

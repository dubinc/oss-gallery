import { cn } from "@dub/utils";

export default function ProjectContentWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative mx-4 flex items-center justify-center rounded-xl border border-gray-200 bg-white p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

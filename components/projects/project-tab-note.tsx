import { cn } from "@dub/utils";
import { Info } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ProjectTabNote(props: {
  className?: string;
  children: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 rounded-xl border border-blue-200 bg-blue-50 p-4",
        props.className,
      )}
    >
      <Info className="h-5 w-5 text-blue-500" />
      {typeof props.children === "string" ? (
        <ReactMarkdown
          className="prose text-[0.95rem] text-gray-600"
          components={{
            a: ({ node, ...props }) => (
              <a
                target="_blank"
                {...props}
                className="font-medium text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-800"
              />
            ),
          }}
        >
          {props.children}
        </ReactMarkdown>
      ) : (
        props.children
      )}
    </div>
  );
}

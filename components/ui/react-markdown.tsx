import { cn } from "@dub/utils";
import ReactMarkdownHelper from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";

import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

export default function ReactMarkdown({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <ReactMarkdownHelper
      className={cn("prose text-[0.95rem] text-gray-600", className)}
      components={{
        a: ({ node, ...props }) => (
          <a
            target="_blank"
            {...props}
            className="font-medium text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-800"
          />
        ),
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;

              if (codeEl.tagName !== "code") return;

              node.raw = codeEl.children?.[0].value;
            }
          });
        },
        // [
        //   rehypePrettyCode,
        //   {
        //     theme: "github-light",
        //   },
        // ],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "div") {
              if (!("data-rehype-pretty-code-fragment" in node.properties)) {
                return;
              }

              for (const child of node.children) {
                if (child.tagName === "pre") {
                  child.properties["raw"] = node.raw;
                }
              }
            }
          });
        },
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
              "data-mdx-heading": "",
            },
          },
        ],
      ]}
    >
      {children}
    </ReactMarkdownHelper>
  );
}

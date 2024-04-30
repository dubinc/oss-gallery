import { getReadme } from "@/lib/actions/get-readme";
import { cn } from "@dub/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import Code from "../mdx/Code";

export default async function Readme({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const readme = await getReadme(owner, repo);

  return (
    <Markdown
      className="flex w-full flex-col"
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
      components={{
        a: ({ node, ...props }) => {
          const { ref, href, ...rest } = props;
          return <Link className="text-blue-400" href={href} {...rest} />;
        },
        p: ({ node, ...props }) => {
          return <p className="mb-4" {...props} />;
        },
        h1: ({ node, ...props }) => {
          return (
            <h1 className="mb-4 border-b pb-2 text-4xl font-bold" {...props} />
          );
        },
        h2: ({ node, ...props }) => {
          return (
            <h2 className="mb-4 border-b pb-2 text-3xl font-bold" {...props} />
          );
        },
        h3: ({ node, ...props }) => {
          return <h3 className="mb-4 text-2xl font-bold" {...props} />;
        },
        h4: ({ node, ...props }) => {
          return <h4 className="mb-4 text-xl font-bold" {...props} />;
        },
        h5: ({ node, ...props }) => {
          return <h5 className="mb-4 text-lg font-bold" {...props} />;
        },
        h6: ({ node, ...props }) => {
          return <h6 className="text-md mb-4 font-bold" {...props} />;
        },
        ul: ({ node, ...props }) => {
          return <ul className="ml-8 list-disc" {...props} />;
        },
        ol: ({ node, ...props }) => {
          return <ol className="ml-8 list-decimal" {...props} />;
        },
        li: ({ node, ...props }) => {
          return <li className="mb-2" {...props} />;
        },
        blockquote: ({ node, ...props }) => {
          return <blockquote className="border-l-4 pl-2" {...props} />;
        },
        code: Code as any,
        pre: ({ node, ...props }) => {
          return (
            <pre
              className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 p-2"
              {...props}
            />
          );
        },
        img: ({ node, className, ...props }) => {
          return <img className={cn(className, "inline-block")} {...props} />;
        },
        hr: ({ node, ...props }) => {
          return (
            <hr className="mb-8 mt-4 border-t border-gray-200" {...props} />
          );
        },
        table: ({ node, ...props }) => {
          return <table className="mb-4 w-full " {...props} />;
        },
        thead: ({ node, ...props }) => {
          return (
            <thead className="border border-gray-200 bg-gray-200" {...props} />
          );
        },
        tbody: ({ node, ...props }) => {
          return <tbody className="border border-gray-200" {...props} />;
        },
        tr: ({ node, ...props }) => {
          return <tr className="border border-gray-200" {...props} />;
        },
        th: ({ node, ...props }) => {
          return <th className="p-2" {...props} />;
        },
        td: ({ node, ...props }) => {
          return <td className=" border border-gray-200 p-2" {...props} />;
        },
      }}
    >
      {readme}
    </Markdown>
  );
}

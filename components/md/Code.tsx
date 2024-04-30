"use client";

import codeToHtml from "@/lib/actions/code-to-html";
import { CopyButton } from "@dub/ui";
import { useEffect, useState } from "react";

export default async function Code({
  node,
  children: code,
  className: language,
  ...props
}) {
  const [codeAsHtml, setCodeAsHtml] = useState<string | undefined>(undefined);
  const inline = (code as string).split("\n").length === 1;

  useEffect(() => {
    if (inline) {
      return;
    }
    const fetchCodeAsHtml = async () => {
      const html = await codeToHtml(
        code as string,
        language ? language.replace("language-", "") : "plaintext",
      );
      setCodeAsHtml(html);
    };
    fetchCodeAsHtml();
  }, [code, language, inline]);

  if (inline) {
    return (
      <span
        {...props}
        className="inline-flex overflow-hidden rounded-lg bg-gray-200 px-1.5 py-0.5 font-mono text-sm "
      >
        {code}
      </span>
    );
  }

  return codeAsHtml ? (
    <div className="relative w-full">
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{
          __html: codeAsHtml as string,
        }}
      />
      <CopyButton
        className="absolute right-1 top-1 rounded-md p-1"
        value={code as string}
      />
    </div>
  ) : (
    <p className="text-center">Loading code...</p>
  );
}

// <code {...props} className={language}>
//   {code}
//   <CopyButton
//     className="absolute right-1 top-1 rounded-md p-1"
//     value={code as string}
//   />
// </code>

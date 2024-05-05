import { bundledLanguages, getHighlighter } from "shiki";

export default async function codeToHtml(code: string, language: string) {
  const highlighter = await getHighlighter({
    themes: ["github-light"],
    langs: [...Object.keys(bundledLanguages)],
  });

  return highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-light",
    colorReplacements: { "#fff": "transparent" },
    transformers: [
      {
        span(node, line, col) {
          node.properties["data-token"] = `token:${line}:${col}`;
        },
      },
    ],
  });
}

"use server";

import { octokit } from "../github";

export async function getReadme(owner: string, repo: string) {
  const res = await octokit.rest.repos.getReadme({
    owner,
    repo,
    mediaType: {
      format: "raw", // Requests the README in raw markdown format,
      // format: "html", // Requests the README in HTML format
      // format: "json", // Requests the README in JSON format
    },
  });

  return res.data as any;
}
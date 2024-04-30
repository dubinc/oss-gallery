"use server";
"use server";

import { octokit } from "../github";
export interface ReadmeInfo {
  type: "file";
  encoding: string;
  size: number;
  name: string;
  path: string;
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    html: string;
    self: string;
  };
  target?: string;
  submodule_git_url?: string;
}

export async function getReadme(owner: string, repo: string) {
  const res = await octokit.rest.repos.getReadme({
    owner,
    repo,
    mediaType: {
      format: "html", // Requests the README in raw markdown format
    },
  });

  return res.data as any;
}

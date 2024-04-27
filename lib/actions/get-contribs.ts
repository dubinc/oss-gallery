"use server";

import { octokit } from "../github";

export interface ContribInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

export async function getContribs(owner: string, repo: string) {
  const res = await octokit.repos.listContributors({
    owner,
    repo,
    per_page: 100,
  });

  return res.data as ContribInfo[];
}

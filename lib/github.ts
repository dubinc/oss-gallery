import { GOOGLE_FAVICON_URL } from "@dub/utils";

export async function getRepo(url: string) {
  const repo = url.replace("https://github.com/", "");
  const data =
    (await fetch(`https://api.github.com/repos/${repo}`, {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 3600,
        },
      }),
    }).then((res) => res.json())) || {};

  const {
    name,
    description,
    homepage,
    owner,
    stargazers_count: stars,
    forks,
    default_branch,
  } = data;

  return {
    url,
    name,
    description,
    logo: owner?.avatar_url || `${GOOGLE_FAVICON_URL}github.com`,
    homepage,
    stars,
    forks,
    default_branch,
  };
}

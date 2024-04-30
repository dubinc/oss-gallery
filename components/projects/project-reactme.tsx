import { getReadme } from "@/lib/actions/get-readme";

export default async function Readme({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const readme = await getReadme(owner, repo);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: readme,
      }}
    ></div>
  );
}

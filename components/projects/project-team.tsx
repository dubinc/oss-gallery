import { getProjectUsers } from "@/lib/actions/get-project-users";
import { ProjectWithLinks } from "@/lib/types";
import { LoadingSpinner } from "@dub/ui";
import Link from "next/link";
import { Suspense } from "react";

export default function ProjectTeam({
  project,
}: {
  project: ProjectWithLinks;
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectTeamRSC project={project} />
    </Suspense>
  );
}

async function ProjectTeamRSC({ project }: { project: ProjectWithLinks }) {
  const projectUsers = await getProjectUsers({ projectId: project.id });

  return (
    <div className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:grid-cols-2">
      {projectUsers.map((user) => (
        <div key={user.id} className="flex items-center space-x-4">
          <Link href={`/${user.username}`}>
            <img
              src={user.image}
              alt="avatar"
              className="h-14 w-14 rounded-full"
            />
          </Link>
          <div className="flex flex-col space-y-0.5">
            <Link
              href={`/${user.username}`}
              className="font-medium text-gray-700 underline-offset-4 hover:underline"
            >
              {user.name}
            </Link>
            <p className="text-sm text-gray-500">{user.projects[0].role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import { nFormatter } from "@dub/utils";
import { Project } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonLinkVariants } from "../ui/button-link";

export default function ProjectCard(project: Project) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="overflow-hidden rounded-xl border border-gray-200 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="aspect-[3/1] w-full rounded-t-xl bg-gradient-to-tr from-purple-100 via-violet-50 to-blue-100" />
      <div className="-mt-8 flex items-center justify-between px-2">
        <Image
          src={project.logo}
          alt={project.name}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2"
        />
        <div className={buttonLinkVariants({ variant: "secondary" })}>
          <Star className="h-4 w-4" />
          <p className="text-sm">{nFormatter(16202, { full: true })}</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-display text-xl font-semibold">{project.name}</h2>
        <p className="mt-2 text-sm text-gray-500">{project.description}</p>
      </div>
    </Link>
  );
}

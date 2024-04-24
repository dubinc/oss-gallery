import { cn, nFormatter } from "@dub/utils";
import { Project } from "@prisma/client";
import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonLinkVariants } from "../ui/button-link";

export default function ProjectCard(project: Project) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div
        className={cn(
          "aspect-[5/2] w-full rounded-t-xl bg-gradient-to-tr",
          project.gradient,
        )}
      />
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
          <p className="text-sm">{nFormatter(project.stars, { full: true })}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-1">
          <h2 className="font-display text-xl font-semibold">{project.name}</h2>
          {project.verified && (
            <BadgeCheck className="h-6 w-6 text-white" fill="#1c9bef" />
          )}
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

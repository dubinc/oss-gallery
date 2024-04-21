import { buttonLinkVariants } from "@/components/ui/button-link";
import { getRepo } from "@/lib/github";
import prisma from "@/lib/prisma";
import { constructMetadata, nFormatter } from "@dub/utils";
import { BadgeCheck, Globe, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project) {
    return;
  }

  return constructMetadata({
    title: `${project.name} | OSS Gallery`,
    description: `View ${project.name} on OSS Gallery. ${project.description}`,
  });
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map(({ slug }) => ({
    slug,
  }));
}

export default async function Project({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      links: true,
    },
  });

  if (!project) {
    notFound();
  }

  const githubLink = project.links.find((link) => link.type === "GITHUB")!;
  const websiteLink = project.links.find((link) => link.type === "WEBSITE");

  const { stars } = await getRepo(githubLink.url);

  return (
    <div>
      <div className="aspect-[4/1] w-full rounded-t-2xl bg-gradient-to-tr from-purple-100 via-violet-50 to-blue-100" />
      <div className="-mt-12 flex items-end justify-between pl-4">
        <Image
          src={project.logo}
          alt={project.name}
          width={100}
          height={100}
          className="h-24 w-24 rounded-full bg-white p-2"
        />
        <div className="flex items-center space-x-2 py-2">
          <a
            href={githubLink.shortLink}
            target="_blank"
            className={buttonLinkVariants({ variant: "secondary" })}
          >
            <Star className="h-4 w-4" />
            <p className="text-sm">{nFormatter(stars, { full: true })}</p>
          </a>
          {websiteLink && (
            <a
              href={websiteLink.shortLink}
              target="_blank"
              className={buttonLinkVariants()}
            >
              <Globe className="h-4 w-4" />
              <p className="text-sm">Website</p>
            </a>
          )}
        </div>
      </div>
      <div className="max-w-lg px-8 py-4">
        <div className="flex items-center space-x-2">
          <h1 className="font-display text-3xl font-bold">{project.name}</h1>
          {project.verified && (
            <BadgeCheck className="h-8 w-8 text-white" fill="#1c9bef" />
          )}
        </div>
        <p className="mt-2 text-gray-500">{project.description}</p>
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            className="mt-4 rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

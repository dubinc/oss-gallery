import EditGradientPopover from "@/components/projects/edit-gradient-popover";
import EditProjectButton from "@/components/projects/edit-project-button";
import ProjectLayoutTabs from "@/components/projects/project-layout-tabs";
import ProjectProvider from "@/components/projects/project-provider";
import { buttonLinkVariants } from "@/components/ui/button-link";
import { getProject } from "@/lib/actions/get-project";
import { dub } from "@/lib/dub";
import { getRepo } from "@/lib/github";
import prisma from "@/lib/prisma";
import { constructMetadata } from "@/lib/utils";
import { cn, nFormatter } from "@dub/utils";
import { BadgeCheck, Globe, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 3600;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await getProject({ slug });

  if (!project) {
    return;
  }

  return constructMetadata({
    title: `${project.name} | OSS Gallery`,
    description: `View ${project.name} on OSS Gallery. ${project.description}`,
  });
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: {
      verified: true,
    },
    take: 150,
  });
  return projects.map(({ slug }) => ({
    slug,
  }));
}

export default async function ProjectLayout({
  params: { slug },
  children,
}: {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}) {
  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  const { stars } = await getRepo(project.githubLink.url);

  const clicks = await Promise.all([
    dub.analytics.clicks({
      externalId: `ext_${project.githubLink.id}`,
    }),
    project.websiteLink &&
      dub.analytics.clicks({
        externalId: `ext_${project.websiteLink.id}`,
      }),
  ]);
  const totalClicks = clicks.reduce((acc, curr) => acc + curr, 0);

  if (stars !== project.stars || totalClicks !== project.clicks) {
    await prisma.project.update({
      where: {
        slug,
      },
      data: {
        ...(stars !== project.stars && { stars }),
        ...(totalClicks !== project.clicks && { clicks: totalClicks }),
      },
    });
  }

  return (
    <ProjectProvider props={project}>
      <div
        className={cn(
          "relative aspect-[4/1] w-full rounded-t-2xl bg-gradient-to-tr",
          project.gradient,
        )}
      >
        <Suspense>
          <EditGradientPopover project={project} />
        </Suspense>
      </div>
      <div className="relative -mt-8 flex items-center justify-between px-4 sm:-mt-12 sm:items-end md:pr-0">
        <Image
          src={project.logo}
          alt={project.name}
          width={100}
          height={100}
          className="h-16 w-16 rounded-full bg-white p-2 sm:h-24 sm:w-24"
        />
        <div className="flex items-center space-x-2 py-2">
          <Suspense>
            <EditProjectButton project={project} />
          </Suspense>
          <a
            href={project.githubLink.shortLink}
            target="_blank"
            className={buttonLinkVariants({ variant: "secondary" })}
          >
            <Star className="h-4 w-4" />
            <p className="text-sm">{nFormatter(stars, { full: true })}</p>
          </a>
          {project.websiteLink && (
            <a
              href={project.websiteLink.shortLink}
              target="_blank"
              className={buttonLinkVariants()}
            >
              <Globe className="h-4 w-4" />
              <p className="text-sm">Website</p>
            </a>
          )}
        </div>
      </div>
      <div className="max-w-lg p-4 pb-0">
        <div className="flex items-center space-x-2">
          <h1 className="font-display text-3xl font-bold">{project.name}</h1>
          {project.verified && (
            <BadgeCheck className="h-8 w-8 text-white" fill="#1c9bef" />
          )}
        </div>
        <p className="mt-2 text-gray-500">{project.description}</p>
      </div>

      <ProjectLayoutTabs />

      <div className="relative mx-4 flex min-h-[22rem] items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
        {children}
      </div>
    </ProjectProvider>
  );
}

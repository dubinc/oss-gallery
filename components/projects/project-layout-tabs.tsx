"use client";

import { cn } from "@dub/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { PROJECT_TABS } from "./project-constants";
import { ProjectContext } from "./project-provider";
import ProjectTabNote from "./project-tab-note";

export default function ProjectLayoutTabs() {
  const { slug, tab } = useParams() as { slug: string; tab?: string[] };
  const { props } = useContext(ProjectContext);

  return (
    <div className="my-4 flex flex-col space-y-6 p-4">
      <div className="flex items-center">
        <TabLink title="Overview" href={`/projects/${slug}`} active={!tab} />
        {PROJECT_TABS.map((t) => (
          <TabLink
            key={t.tab}
            title={t.title}
            href={`/projects/${slug}/${t.tab}`}
            active={tab && tab[0] === t.tab}
          />
        ))}
      </div>

      <ProjectTabNote>
        {tab
          ? tab[0] === "team"
            ? `Active team members of the project. View the full list on [GitHub](${props.githubLink.shortLink}).`
            : tab[0] === "contributors"
              ? `Top contributors of the project – powered by [contrib.rocks](https://contrib.rocks). View the full list on [GitHub](${props.githubLink.shortLink}).`
              : ""
          : "Real-time click analytics for each of the links above – powered by the [Dub API](https://dub.co/api)."}
      </ProjectTabNote>
    </div>
  );
}

export const TabLink = ({
  title,
  href,
  active,
}: {
  title: string;
  href: string;
  active?: boolean;
}) => {
  return (
    <Link href={href} className="relative z-10">
      <div
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 transition-all",
          active ? "text-white" : "hover:text-gray-500",
        )}
      >
        {title}
      </div>
      {active && (
        <motion.div
          layoutId="indicator"
          className="absolute left-0 top-0 h-full w-full rounded-full bg-black"
          style={{ zIndex: -1 }}
        />
      )}
    </Link>
  );
};

"use client";

import { cn } from "@dub/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const PROJECT_TABS = [
  {
    title: "Analytics",
    tab: "analytics",
  },
  {
    title: "Contributors",
    tab: "contributors",
  },
];

export default function ProjectLayoutTabs() {
  const { slug, tab } = useParams() as { slug: string; tab?: string[] };

  return (
    <div className="my-6 flex items-center">
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
  );
}

const TabLink = ({
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

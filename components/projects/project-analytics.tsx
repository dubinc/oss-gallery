import { dub } from "@/lib/dub";
import { ProjectWithLinks } from "@/lib/types";
import { Suspense } from "react";
import ProjectAnalyticsClient from "./project-analytics-client";
import ProjectAnalyticsPlacholder from "./project-analytics-placeholder";

export default function ProjectAnalytics({
  project,
}: {
  project: ProjectWithLinks;
}) {
  return (
    <Suspense fallback={<ProjectAnalyticsPlacholder />}>
      <ProjectAnalyticsRSC project={project} />
    </Suspense>
  );
}

async function ProjectAnalyticsRSC({ project }: { project: ProjectWithLinks }) {
  const { links } = project;

  const analytics = await Promise.all(
    links.map(async (link) => {
      return await dub.analytics.timeseries({
        externalId: `ext_${link.id}`,
        interval: "30d",
      });
    }),
  );

  const chartData = analytics[0].map(
    (data: { start: string; clicks: number }, i) => {
      return {
        start: new Date(data.start).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        [links[0].type]: analytics[0][i].clicks,
        [links[1].type]: analytics[1][i].clicks,
      };
    },
  );

  return (
    <div className="mt-4">
      <ProjectAnalyticsClient
        chartData={chartData}
        categories={[links[0].type, links[1].type]}
      />
    </div>
  );
}

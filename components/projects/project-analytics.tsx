import { dub } from "@/lib/dub";
import { EnrichedProjectProps } from "@/lib/types";
import { LoadingSpinner } from "@dub/ui";
import { AnalyticsTimeseries } from "dub/dist/commonjs/models/components";
import { Suspense } from "react";
import ProjectAnalyticsClient from "./project-analytics-client";

export default function ProjectAnalytics({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectAnalyticsRSC project={project} />
    </Suspense>
  );
}

async function ProjectAnalyticsRSC({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  const { links } = project;

  // if project created less than 3 days ago, it's a newly added project
  const newlyAddedProject =
    new Date(project.createdAt).getTime() >
    Date.now() - 3 * 24 * 60 * 60 * 1000;

  console.log("Refreshing analytics data");

  const analytics = await Promise.all(
    links
      .sort(
        // show GITHUB first, then WEBSITE
        (a, _) => (a.type === "GITHUB" ? -1 : 1),
      )
      .map(async (link) => {
        return (await dub.analytics
          .retrieve({
            groupBy: "timeseries",
            externalId: `ext_${link.id}`,
            interval: newlyAddedProject ? "24h" : "30d",
          })
          .catch(() => [])) as AnalyticsTimeseries[];
      }),
  );

  const chartData = analytics[0].map((data, i) => {
    return {
      start: new Date(data.start).toLocaleDateString(
        "en-US",
        newlyAddedProject
          ? {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          : {
              month: "short",
              day: "numeric",
            },
      ),
      [links[0].type]: analytics[0][i]?.clicks,
      ...(links[1] && {
        [links[1].type]: analytics[1][i]?.clicks,
      }),
    };
  });

  return (
    <ProjectAnalyticsClient
      chartData={chartData}
      categories={[links[0].type, links[1] ? links[1].type : undefined]}
      startEndOnly={newlyAddedProject}
    />
  );
}

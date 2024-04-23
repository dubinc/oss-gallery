"use client";
import { nFormatter } from "@dub/utils";
import { AreaChart } from "@tremor/react";

export default function ProjectAnalyticsClient({
  chartData,
  categories,
  startEndOnly,
}: {
  chartData: any[];
  categories: string[];
  startEndOnly?: boolean;
}) {
  return (
    <AreaChart
      className="-ml-4 h-80"
      data={chartData}
      index="start"
      categories={categories}
      colors={["rose", "blue"]}
      valueFormatter={nFormatter}
      yAxisWidth={60}
      startEndOnly={startEndOnly}
      onValueChange={(v) => console.log(v)}
    />
  );
}

"use client";
import { nFormatter } from "@dub/utils";
import { AreaChart } from "@tremor/react";

export default function ProjectAnalyticsClient({
  chartData,
  categories,
}: {
  chartData: any[];
  categories: string[];
}) {
  return (
    <AreaChart
      className="h-80"
      data={chartData}
      index="start"
      categories={categories}
      colors={["blue", "rose"]}
      valueFormatter={nFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}

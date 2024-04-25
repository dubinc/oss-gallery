"use client";

import { LoadingSpinner } from "@dub/ui";
import { nFormatter } from "@dub/utils";
import { AreaChart } from "@tremor/react";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { buttonLinkVariants } from "../ui/button-link";

export default function ProjectAnalyticsClient({
  chartData,
  categories,
  startEndOnly,
}: {
  chartData: any[];
  categories: string[];
  startEndOnly?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refreshData = async () => {
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-medium text-gray-700">
          Real-time click analytics
        </h2>
        <button
          onClick={refreshData}
          disabled={isPending}
          className={buttonLinkVariants({ variant: "secondary" })}
        >
          {isPending ? (
            <LoadingSpinner className="h-4 w-4" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </button>
      </div>
      <AreaChart
        className="-ml-4 h-80"
        data={chartData}
        index="start"
        categories={categories}
        colors={["rose", "blue"]}
        valueFormatter={nFormatter}
        yAxisWidth={60}
        startEndOnly={startEndOnly}
        showAnimation
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}

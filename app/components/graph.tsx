"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { useBookmark } from "@/app/hooks/use-bookmark";

export const description = "An interactive bar chart";

const chartConfig = {
  bookmarks: {
    label: "Bookmarks",
    color: "rgb(68 64 60)",
  },
} satisfies ChartConfig;

export default function Graph() {
  const { getBookmarksPerDay } = useBookmark();
  const [bookmarkChartData, setBookmarkChartData] = useState<
    { date: string; bookmarks: number }[]
  >([]);

  useEffect(() => {
    const chartData = getBookmarksPerDay() || [];
    setBookmarkChartData(chartData);
  }, [getBookmarksPerDay]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bookmark Activity</CardTitle>
          <CardDescription>
            An overview of bookmarks added each day.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={bookmarkChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="bookmarks" fill={`var(--color-bookmarks)`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

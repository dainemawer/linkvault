"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import type { Bookmark } from "../types/bookmarks";
import { useMemo } from "react";
import { useBookmark } from "@/app/hooks/use-bookmark";
import { isTimestampInCurrentWeek } from "@/app/util/date";
import { Skeleton } from "./ui/skeleton";

const filterBookmarks = (
  bookmarks: Bookmark[],
  filterFn: (bookmark: Bookmark) => boolean
) => {
  return bookmarks.filter(filterFn);
};

interface OverviewCardProps {
  title: string | number;
  description: string;
  content: string;
  loading: boolean;
}

const OverviewCard = ({
  title,
  description,
  content,
  loading,
}: OverviewCardProps) => {
  if (!title || !description || !content) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>No data available</CardDescription>
          <CardTitle className="text-4xl">No bookmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">No bookmark data</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {loading && (
        <div className="flex flex-col gap-2 py-6">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-full" />
        </div>
      )}
      {!loading && (
        <>
          <CardHeader className="pb-2">
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-4xl">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">{content}</div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default function Overview() {
  const { bookmarks } = useBookmark();
  const isLoading = !bookmarks || bookmarks.length === 0;

  const totalBookmarks = isLoading ? 0 : bookmarks.length;

  const thisWeekBookmarks = useMemo(
    () =>
      isLoading
        ? []
        : filterBookmarks(bookmarks as Bookmark[], (bookmark: Bookmark) =>
            isTimestampInCurrentWeek(Date.parse(bookmark.date as string))
          ),
    [bookmarks, isLoading]
  );

  const lastWeekBookmarks = useMemo(
    () =>
      isLoading
        ? []
        : filterBookmarks(
            bookmarks as Bookmark[],
            (bookmark: Bookmark) =>
              !isTimestampInCurrentWeek(Date.parse(bookmark.date as string))
          ),
    [bookmarks, isLoading]
  );

  const favouriteBookmarks = useMemo(
    () =>
      isLoading
        ? []
        : bookmarks.filter((bookmark: Bookmark) => bookmark.is_favourite), // filter by is_favourite
    [bookmarks, isLoading]
  );

  const favouriteBookmarksThisWeek = useMemo(
    () =>
      isLoading
        ? []
        : filterBookmarks(
            thisWeekBookmarks,
            (bookmark: Bookmark) => bookmark.is_favourite
          ),
    [thisWeekBookmarks, isLoading]
  );

  const thisWeekLastWeekIncrease = useMemo(() => {
    if (isLoading || lastWeekBookmarks.length === 0) {
      return 0; // Avoid division by zero and return 0 during loading
    }
    const increase = thisWeekBookmarks.length - lastWeekBookmarks.length;
    return lastWeekBookmarks.length > 0
      ? Math.round((increase / lastWeekBookmarks.length) * 100)
      : 0;
  }, [thisWeekBookmarks, lastWeekBookmarks, isLoading]);

  return (
    <section className="grid gap-4 grid-cols-3 p-4 px-0 sm:py-0">
      <OverviewCard
        loading={isLoading}
        title={thisWeekBookmarks.length}
        description="This Week"
        content={`+${thisWeekLastWeekIncrease}% from last week`}
      />
      <OverviewCard
        loading={isLoading}
        title={totalBookmarks}
        description="Total Bookmarks"
        content={`${thisWeekBookmarks.length} new bookmarks this week`}
      />
      <OverviewCard
        loading={isLoading}
        title={favouriteBookmarksThisWeek.length}
        description="Favourite Bookmarks"
        content={`${favouriteBookmarks.length} bookmarks in total`}
      />
    </section>
  );
}

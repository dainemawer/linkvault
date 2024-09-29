"use client";

import { useEffect, useCallback } from "react";
import { createContext, useState, ReactNode } from "react";
import { createClerkSupabaseClient } from "@/app/supabase/client";
import { useAuth } from "@clerk/nextjs";
import { getFavicon } from "@/app/util/favicon";
import { formatDate } from "@/app/util/date";
import { Bookmark, BookmarkContextType } from "@/app/types/bookmarks";

export const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

// Context provider
export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken, userId } = useAuth();

  const client = createClerkSupabaseClient(getToken);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await client.from("bookmarks").select("*");
    if (error) {
      setError(error.message);
    } else {
      setBookmarks(data);
    }
    setLoading(false);
  }, [client]);

  const addBookmark = async (bookmark: Bookmark) => {
    const date = formatDate(new Date());
    const favicon = getFavicon(bookmark.url, 24);
    const user_id = userId;

    const newBookmark = {
      ...bookmark,
      is_favourite: false,
      date,
      favicon,
      user_id,
    };

    const { data, error } = await client.from("bookmarks").insert(newBookmark);

    if (error) {
      setError(error.message);
    } else {
      if (data) {
        setBookmarks((prev) => [...prev, data[0]]);
      }
    }
  };

  const updateBookmark = async (
    id: number,
    updatedBookmark: Partial<Bookmark>
  ) => {
    const { error } = await client
      .from("bookmarks")
      .update(updatedBookmark)
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark
        )
      );
    }
  };

  const deleteBookmark = async (id: number) => {
    const { error } = await client.from("bookmarks").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    }
  };

  const setMarkAsRead = async (id: number, status: string) => {
    const { error } = await client
      .from("bookmarks")
      .update({ status })
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark.id === id ? { ...bookmark, status } : bookmark
        )
      );
    }
  };

  const setFavouriteBookmark = async (id: number, favourite: boolean) => {
    const { error } = await client
      .from("bookmarks")
      .update({ is_favourite: favourite })
      .eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark.id === id
            ? { ...bookmark, is_favourite: favourite }
            : bookmark
        )
      );
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        fetchBookmarks,
        addBookmark,
        updateBookmark,
        deleteBookmark,
        setFavouriteBookmark,
        setMarkAsRead,
        loading,
        error,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

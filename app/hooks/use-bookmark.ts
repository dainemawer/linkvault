import { useContext } from "react";
import { BookmarkContext } from "@/app/context/BookmarkProvider";

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
};
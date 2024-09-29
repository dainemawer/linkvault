export interface Bookmark {
  id?: number;
  date?: string;
  title: string;
  url: string;
  type: string;
  favicon?: string;
  category: string;
  status: string;
  is_favourite: boolean;
}

export interface BookmarkContextType {
  bookmarks: Bookmark[];
  fetchBookmarks: () => Promise<void>;
  addBookmark: (newBookmark: Bookmark) => Promise<void>;
  updateBookmark: (
    id: number,
    updatedBookmark: Partial<Bookmark>
  ) => Promise<void>;
  deleteBookmark: (id: number) => Promise<void>;
  setFavouriteBookmark: (id: number, favourite: boolean) => Promise<void>;
  setMarkAsRead: (id: number, status: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}
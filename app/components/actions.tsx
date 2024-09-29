import { Bookmark } from "@/app/types/bookmarks";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useBookmark } from "@/app/hooks/use-bookmark";
import { useModal } from "@/app/hooks/use-modal";
import { useToast } from "@/app/hooks/use-toast";
import BookMarkForm from "@/app/components/form";

interface BookmarkActionsProps {
  bookmark: Bookmark;
}

const BookmarkActions: React.FC<BookmarkActionsProps> = ({ bookmark }) => {
  const { deleteBookmark, setMarkAsRead } = useBookmark(); // Access delete function from context
  const { openModal } = useModal(); // Assuming your modal provider has an openModal function
  const { toast } = useToast();

  const handleEdit = (bookmark: Bookmark) => {
    openModal(
      <BookMarkForm
        bookmarkId={bookmark.id?.toString()}
        defaultValues={{
          url: bookmark.url,
          title: bookmark.title,
          type: bookmark.type,
          category: bookmark.category,
        }}
      />
    ); // Trigger modal for the specific bookmark ID
  };

  const handleDelete = () => {
    if (bookmark.id === undefined) {
      return;
    }

    deleteBookmark(bookmark.id); // Call the delete function from the context
    toast({
      title: "Bookmark deleted!",
      description: `${bookmark.title} has been deleted.`,
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(bookmark.url);
    toast({
      title: "Copied!",
      description: `${bookmark.title} has been copied to clipboard.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyToClipboard}>
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setMarkAsRead(Number(bookmark.id), "read")}
        >
          Mark as Read
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Share</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(bookmark)}>
          Edit bookmark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Delete bookmark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BookmarkActions;

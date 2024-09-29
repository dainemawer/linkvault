import { useState } from "react";
import { Heart } from "lucide-react";
import { useBookmark } from "@/app/hooks/use-bookmark";

interface FavouriteBookmarkProps {
  bookmarkId: number;
  isFavourite: boolean;
}

const FavouriteBookmark: React.FC<FavouriteBookmarkProps> = ({
  bookmarkId,
  isFavourite: initialIsFavourite,
}) => {
  const { setFavouriteBookmark } = useBookmark();
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);

  const handleFavouriteToggle = async () => {
    const newFavouriteStatus = !isFavourite;
    setIsFavourite(newFavouriteStatus);

    try {
      await setFavouriteBookmark(bookmarkId, newFavouriteStatus);
    } catch (error) {
      console.error("Error updating favourite status:", error);
      setIsFavourite(!newFavouriteStatus);
    }
  };

  return (
    <div className="text-center cursor-pointer" onClick={handleFavouriteToggle}>
      {isFavourite ? (
        <Heart strokeWidth={1.5} className="w-4 h-4 text-red-500" />
      ) : (
        <Heart strokeWidth={1.5} className="w-4 h-4 text-muted-foreground" />
      )}
    </div>
  );
};

export default FavouriteBookmark;

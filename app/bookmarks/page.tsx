import Hero from "@/app/components/hero";
import dynamic from "next/dynamic";

const Bookmarks = dynamic(() => import("@/app/components/bookmarks"), {
  ssr: false,
});

export default function BookmarksPage() {
  return (
    <>
      <Hero
        title="Bookmarks"
        description="View all currently saved bookmarks"
      />
      <Bookmarks enableAdvancedFilters={true} status="read" />
    </>
  );
}

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/app/components/hero"), {
  ssr: true,
});

const Graph = dynamic(() => import("@/app/components/graph"), {
  ssr: false,
});

const Bookmarks = dynamic(() => import("@/app/components/bookmarks"), {
  ssr: false,
});

export default async function InboxPage() {
  return (
    <>
      <Hero title="Inbox" description="Recently added bookmarks" />
      <Graph />
      <Bookmarks enableAdvancedFilters={false} status="inbox" />
    </>
  );
}

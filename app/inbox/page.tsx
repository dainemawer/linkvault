import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/app/components/hero"), {
  ssr: true,
});

const Overview = dynamic(() => import("@/app/components/overview"), {
  ssr: false,
});

const Bookmarks = dynamic(() => import("@/app/components/bookmarks"), {
  ssr: false,
});

export default async function InboxPage() {
  return (
    <>
      <Hero title="Inbox" description="Recently added bookmarks" />
      <Overview />
      <Bookmarks enableAdvancedFilters={false} status="inbox" />
    </>
  );
}

import type { Metadata } from "next";
import Layout from "@/app/components/layout";

export const metadata: Metadata = {
  title: "Linkvault | Collections",
  description: "Your personal bookmark manager, nothing more - nothing less.",
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}

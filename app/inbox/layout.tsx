import type { Metadata } from "next";
import Layout from "@/app/components/layout";

export const metadata: Metadata = {
  title: "Linkvault | Inbox",
  description: "Your personal bookmark manager, nothing more - nothing less.",
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}

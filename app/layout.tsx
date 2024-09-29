import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Layout from "@/app/components/layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Linkvault",
  description: "Your personal bookmark manager, nothing more - nothing less.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        signInFallbackRedirectUrl="/inbox"
        signUpFallbackRedirectUrl="/inbox"
      >
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}

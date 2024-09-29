import dynamic from "next/dynamic";
import { ModalProvider } from "@/app/context/ModalProvider";
import { BookmarkProvider } from "@/app/context/BookmarkProvider";

const Toaster = dynamic(() =>
  import("@/app/components/ui/toaster").then((mod) => mod.Toaster)
);

const Footer = dynamic(() => import("@/app/components/footer"), {
  ssr: false,
});

const Header = dynamic(() => import("@/app/components/header"), {
  ssr: true,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BookmarkProvider>
        <ModalProvider>
          <Header />
          <div className="flex flex-col sm:gap-4 sm:py-4 min-h-full container max-w-7xl mx-auto">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 h-full">
              {children}
            </main>
          </div>
          <Footer />
          <Toaster />
        </ModalProvider>
      </BookmarkProvider>
    </>
  );
}

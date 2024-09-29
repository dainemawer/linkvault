import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linkvault | Sign Up",
  description: "Your personal bookmark manager, nothing more - nothing less.",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {children}
    </div>
  );
}

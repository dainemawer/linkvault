"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import UserMenu from "@/app/components/user-menu";
import { Button } from "./ui/button";
import { useModal } from "@/app/hooks/use-modal";
import BookMarkForm from "@/app/components/form";
import { CirclePlus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { openModal } = useModal();
  const pathname = usePathname();

  const handleOpenModal = () => {
    openModal(<BookMarkForm />);
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactElement | string;
  }) => {
    return (
      <Link
        className={`underline-offset-4 hover:text-neutral-900 ${
          pathname === href ? "text-neutral-900 underline" : ""
        }`}
        href={href}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 py-8 sm:static sm:border-0 sm:bg-transparent sm:px-6 justify-between container max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link className="flex items-center gap-4" href="/">
          <Layers />
          <span className="font-bold">linkvault</span>
        </Link>
        <nav>
          <ul className="flex gap-4 text-sm text-neutral-600">
            <li>
              <NavLink href="/inbox">Inbox</NavLink>
            </li>
            <li>
              <NavLink href="/bookmarks">Bookmarks</NavLink>
            </li>
            <li>
              <NavLink href="/collections">Collections</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <nav className="flex items-center gap-4">
        <Button onClick={handleOpenModal} className="text-xs">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add bookmark
        </Button>
        <UserMenu />
      </nav>
    </header>
  );
}

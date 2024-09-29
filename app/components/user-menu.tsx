"use client";

import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Link from "next/link";
import { Cog, Settings, LogOut } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { UserButton } from "@clerk/nextjs";

export default function UserMenu() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <UserButton userProfileMode="modal" />
      <DropdownMenu>
        <DropdownMenuTrigger className="text-neutral-500 hover:text-neutral-800">
          <Cog size={22} strokeWidth={1.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Welcome, {user.firstName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link className="mr-8" href="/settings">
              Settings
            </Link>
            <DropdownMenuShortcut>⇧⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <SignOutButton>Sign out</SignOutButton>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

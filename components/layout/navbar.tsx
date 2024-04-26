"use client";

import { Session } from "@/lib/auth";
import { useScroll } from "@dub/ui";
import { cn, nFormatter } from "@dub/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { SubmitProjectButton } from "../projects/submit-project-button";
import { buttonLinkVariants } from "../ui/button-link";
import UserDropdown from "./user-dropdown";

export default function NavBar({
  session,
  stars,
}: {
  session: Session | null;
  stars: number;
}) {
  const scrolled = useScroll(50);

  return (
    <div
      className={`fixed top-0 flex w-full justify-center ${
        scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
      } z-30 transition-all`}
    >
      <div className="mx-5 flex h-16 w-full max-w-screen-md items-center justify-between">
        <Link href="/">
          <img src="/logomark.svg" alt="OSS Gallery logo" className="h-8" />
        </Link>
        <div className="flex items-center space-x-2">
          <a
            href="https://go.oss.gallery/github"
            target="_blank"
            className={cn(
              buttonLinkVariants({ variant: "secondary" }),
              "px-3 py-1.5",
            )}
          >
            <Star className="h-4 w-4" />
            <p className="text-sm">{nFormatter(stars, { full: true })}</p>
          </a>
          <SubmitProjectButton />
          {session && <UserDropdown session={session} />}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Session } from "@/lib/auth";
import { useScroll } from "@dub/ui";
import Image from "next/image";
import Link from "next/link";
import { SubmitProjectButton } from "../projects/submit-project-button";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }: { session: Session | null }) {
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
        <Link
          href="/"
          className="flex items-center font-display text-lg font-semibold"
        >
          <Image
            src="/logo.png"
            alt="Precedent logo"
            width="30"
            height="30"
            className="mr-2 rounded-sm"
          />
          <p>OSS Gallery</p>
        </Link>
        <div className="flex items-center space-x-2">
          <SubmitProjectButton />
          {session && <UserDropdown session={session} />}
        </div>
      </div>
    </div>
  );
}

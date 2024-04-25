import { auth } from "@/auth";
import { Session } from "@/lib/auth";
import { getRepo } from "@/lib/github";
import { Suspense } from "react";
import Navbar from "./navbar";

export default function Nav() {
  return (
    <Suspense>
      <NavRSC />
    </Suspense>
  );
}

async function NavRSC() {
  const [session, { stars }] = (await Promise.all([
    auth(),
    getRepo("https://github.com/dubinc/oss-gallery"),
  ])) as [Session, { stars: number }];

  return <Navbar session={session} stars={stars} />;
}

import { auth } from "@/auth";
import { Session } from "@/lib/auth";
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
  const session = (await auth()) as Session;
  return <Navbar session={session} />;
}

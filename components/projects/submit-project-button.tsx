"use client";

import { AppContext } from "@/app/providers";
import { cn } from "@dub/utils";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { buttonLinkVariants } from "../ui/button-link";

export function SubmitProjectButton({ text = "Submit" }: { text?: string }) {
  const { data: session, status } = useSession();
  const { setShowSignInModal, setShowSubmitProjectModal } =
    useContext(AppContext);

  if (status === "loading") {
    return null;
  }

  return (
    <button
      className={cn(buttonLinkVariants(), "px-3 py-1.5")}
      onClick={() => {
        if (session) {
          setShowSubmitProjectModal(true);
        } else {
          setShowSignInModal(true);
        }
      }}
    >
      {text}
    </button>
  );
}

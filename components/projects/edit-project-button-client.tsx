"use client";

import { cn } from "@dub/utils";
import { Edit2 } from "lucide-react";
import { useContext } from "react";
import { buttonLinkVariants } from "../ui/button-link";
import { ProjectContext } from "./project-provider";

export function EditProjectButtonClient() {
  const { setShowEditProjectModal } = useContext(ProjectContext);

  return (
    <button
      className={cn(
        buttonLinkVariants({ variant: "secondary" }),
        "space-x-0 px-1",
      )}
      onClick={() => setShowEditProjectModal(true)}
    >
      <span className="sr-only">Edit Project</span>
      <Edit2 className="h-4 w-4" />
    </button>
  );
}

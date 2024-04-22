"use client";

import { ProjectWithLinks } from "@/lib/types";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { useEditProjectModal } from "./edit-project-modal";

export const ProjectContext = createContext<{
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowEditProjectModal: () => {},
});

export default function ProjectProvider({
  children,
  props,
}: {
  children: ReactNode;
  props: ProjectWithLinks;
}) {
  const { EditProjectModal, setShowEditProjectModal } = useEditProjectModal({
    props,
  });

  return (
    <ProjectContext.Provider
      value={{
        setShowEditProjectModal,
      }}
    >
      <EditProjectModal />
      {children}
    </ProjectContext.Provider>
  );
}

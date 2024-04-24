"use client";

import { EnrichedProjectProps } from "@/lib/types";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { useEditProjectModal } from "./edit-project-modal";
import { useEditTeamModal } from "./edit-team-modal";

export const ProjectContext = createContext<{
  props: EnrichedProjectProps;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}>({
  props: {} as EnrichedProjectProps,
  setShowEditProjectModal: () => {},
  setShowEditTeamModal: () => {},
});

export default function ProjectProvider({
  children,
  props,
}: {
  children: ReactNode;
  props: EnrichedProjectProps;
}) {
  const { EditProjectModal, setShowEditProjectModal } = useEditProjectModal({
    props,
  });
  const { EditTeamModal, setShowEditTeamModal } = useEditTeamModal({
    props,
  });

  return (
    <ProjectContext.Provider
      value={{
        props,
        setShowEditProjectModal,
        setShowEditTeamModal,
      }}
    >
      <EditProjectModal />
      <EditTeamModal />
      {children}
    </ProjectContext.Provider>
  );
}

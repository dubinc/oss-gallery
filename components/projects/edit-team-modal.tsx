"use client";

import { EnrichedProjectProps } from "@/lib/types";
import { Modal } from "@dub/ui";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import EditTeamForm from "./edit-team-form";

const EditTeamModal = ({
  showEditTeamModal,
  setShowEditTeamModal,
  props,
}: {
  showEditTeamModal: boolean;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
  props: EnrichedProjectProps;
}) => {
  return (
    <Modal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal}>
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <Image
          src={props.logo}
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
        />
        <h3 className="font-display text-xl font-bold">Edit Project</h3>
      </div>

      <EditTeamForm props={props} setShowEditTeamModal={setShowEditTeamModal} />
    </Modal>
  );
};

export function useEditTeamModal({ props }: { props: EnrichedProjectProps }) {
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);

  const EditTeamModalCallback = useCallback(() => {
    return (
      <EditTeamModal
        showEditTeamModal={showEditTeamModal}
        setShowEditTeamModal={setShowEditTeamModal}
        props={props}
      />
    );
  }, [showEditTeamModal, setShowEditTeamModal, props]);

  return useMemo(
    () => ({
      setShowEditTeamModal,
      EditTeamModal: EditTeamModalCallback,
    }),
    [setShowEditTeamModal, EditTeamModalCallback],
  );
}

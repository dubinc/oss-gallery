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
import EditProjectForm from "./edit-project-form";

const EditProjectModal = ({
  showEditProjectModal,
  setShowEditProjectModal,
  props,
}: {
  showEditProjectModal: boolean;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
  props: EnrichedProjectProps;
}) => {
  return (
    <Modal
      showModal={showEditProjectModal}
      setShowModal={setShowEditProjectModal}
    >
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <Image
          src={props.logo}
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
          unoptimized
        />
        <h3 className="font-display text-xl font-bold">Edit Project</h3>
      </div>

      <EditProjectForm
        props={props}
        setShowEditProjectModal={setShowEditProjectModal}
      />
    </Modal>
  );
};

export function useEditProjectModal({
  props,
}: {
  props: EnrichedProjectProps;
}) {
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  const EditProjectModalCallback = useCallback(() => {
    return (
      <EditProjectModal
        showEditProjectModal={showEditProjectModal}
        setShowEditProjectModal={setShowEditProjectModal}
        props={props}
      />
    );
  }, [showEditProjectModal, setShowEditProjectModal, props]);

  return useMemo(
    () => ({
      setShowEditProjectModal,
      EditProjectModal: EditProjectModalCallback,
    }),
    [setShowEditProjectModal, EditProjectModalCallback],
  );
}

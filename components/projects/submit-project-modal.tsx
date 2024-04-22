import { Modal } from "@dub/ui";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import SubmitProjectForm from "./submit-project-form";

const SubmitProjectModal = ({
  showSubmitProjectModal,
  setShowSubmitProjectModal,
}: {
  showSubmitProjectModal: boolean;
  setShowSubmitProjectModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      showModal={showSubmitProjectModal}
      setShowModal={setShowSubmitProjectModal}
    >
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
        />
        <h3 className="font-display text-xl font-bold">Submit a new project</h3>
        <p className="text-sm text-gray-500">
          Submit an open-source project to be featured on OSS Gallery.
        </p>
      </div>

      <SubmitProjectForm
        setShowSubmitProjectModal={setShowSubmitProjectModal}
      />
    </Modal>
  );
};

export function useSubmitProjectModal() {
  const [showSubmitProjectModal, setShowSubmitProjectModal] = useState(false);

  const SubmitProjectModalCallback = useCallback(() => {
    return (
      <SubmitProjectModal
        showSubmitProjectModal={showSubmitProjectModal}
        setShowSubmitProjectModal={setShowSubmitProjectModal}
      />
    );
  }, [showSubmitProjectModal, setShowSubmitProjectModal]);

  return useMemo(
    () => ({
      setShowSubmitProjectModal,
      SubmitProjectModal: SubmitProjectModalCallback,
    }),
    [setShowSubmitProjectModal, SubmitProjectModalCallback],
  );
}

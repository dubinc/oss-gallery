"use client";

import { EditProjectProps, editProject } from "@/lib/actions/edit-project";
import { ProjectWithLinks } from "@/lib/types";
import { getFormDataError } from "@/lib/zod";
import { Button, useMediaQuery } from "@dub/ui";
import { AlertCircle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

export default function EditProjectForm({
  props,
  setShowEditProjectModal,
}: {
  props: ProjectWithLinks;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}) {
  const initialState = {
    props,
  } satisfies EditProjectProps;

  const [state, formAction] = useFormState(editProject, initialState);
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    if (state?.success) {
      setShowEditProjectModal(false);
      toast.success("Successfully updated project details!");
    }
  }, [state?.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16"
    >
      <label htmlFor="name">
        <span className="text-sm font-medium text-gray-900">Project Name</span>
        <div className="relative mt-1">
          <input
            name="name"
            id="name"
            autoFocus={!isMobile}
            required
            defaultValue={props.name}
            placeholder="Dub"
            className={`${
              state?.errors && getFormDataError(state.errors, "name")
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.errors && getFormDataError(state.errors, "name") && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {state?.errors && getFormDataError(state.errors, "name") && (
          <p className="mt-1 text-sm text-red-600">
            {getFormDataError(state.errors, "name").message}
          </p>
        )}
      </label>

      <label htmlFor="description">
        <span className="text-sm font-medium text-gray-900">
          Project Description
        </span>
        <div className="relative mt-1">
          <TextareaAutosize
            name="description"
            id="description"
            required
            minRows={3}
            defaultValue={props.description}
            placeholder="Open-source link management infrastructure."
            className={`${
              state?.errors && getFormDataError(state.errors, "description")
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.errors && getFormDataError(state.errors, "description") && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {state?.errors && getFormDataError(state.errors, "description") && (
          <p className="mt-1 text-sm text-red-600">
            {getFormDataError(state.errors, "description").message}
          </p>
        )}
      </label>

      <label htmlFor="github">
        <span className="text-sm font-medium text-gray-900">
          GitHub Repository
        </span>
        <div className="relative mt-1">
          <input
            name="github"
            id="github"
            required
            defaultValue={props.githubLink.url}
            placeholder="https://github.com/dubinc/dub"
            className={`${
              state?.errors && getFormDataError(state.errors, "github")
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.errors && getFormDataError(state.errors, "github") && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {state?.errors && getFormDataError(state.errors, "github") && (
          <p className="mt-1 text-sm text-red-600">
            {getFormDataError(state.errors, "github").message}
          </p>
        )}
      </label>

      <label htmlFor="website">
        <span className="text-sm font-medium text-gray-900">Website</span>
        <div className="relative mt-1">
          <input
            name="website"
            id="website"
            required
            defaultValue={props.websiteLink.url}
            placeholder="https://dub.co"
            className={`${
              state?.errors && getFormDataError(state.errors, "website")
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.errors && getFormDataError(state.errors, "website") && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {state?.errors && getFormDataError(state.errors, "website") && (
          <p className="mt-1 text-sm text-red-600">
            {getFormDataError(state.errors, "website").message}
          </p>
        )}
      </label>
      <input type="hidden" name="projectId" value={props.id} />
      <FormButton />
    </form>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return <Button text="Save changes" loading={pending} />;
};

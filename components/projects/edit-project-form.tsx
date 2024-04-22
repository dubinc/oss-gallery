"use client";

import { editProject } from "@/lib/actions/edit-project";
import { ProjectWithLinks } from "@/lib/types";
import { Button, useMediaQuery } from "@dub/ui";
import { AlertCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

export default function EditProjectForm({
  props,
}: {
  props: ProjectWithLinks;
}) {
  const initialState = {
    props,
    error: null,
  };

  const [state, formAction] = useFormState(editProject, initialState);
  const { isMobile } = useMediaQuery();

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16"
    >
      <input type="hidden" name="projectId" value={props.id} />
      <label htmlFor="github">
        <span className="text-sm font-medium text-gray-900">
          GitHub Repository
        </span>
        <div className="relative mt-1">
          <input
            name="github"
            id="github"
            autoFocus={!isMobile}
            required
            defaultValue={props.githubLink.url}
            placeholder="https://github.com/dubinc/dub"
            className={`${
              state?.error?.github
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.error?.github && (
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
        {state?.error?.github && (
          <p className="mt-1 text-sm text-red-600" id="form-error">
            {state?.error?.github}
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
              state?.error?.website
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.error?.website && (
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
        {state?.error?.website && (
          <p className="mt-1 text-sm text-red-600" id="form-error">
            {state?.error?.website}
          </p>
        )}
      </label>
      <FormButton />
    </form>
  );
}

const FormButton = () => {
  const { pending } = useFormStatus();
  return <Button text="Save changes" loading={pending} />;
};

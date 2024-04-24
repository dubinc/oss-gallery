"use client";

import { editProject } from "@/lib/actions/edit-project";
import { revalidateProject } from "@/lib/actions/revalidate-project";
import { FormResponse, editProjectSchema } from "@/lib/actions/utils";
import { EnrichedProjectProps } from "@/lib/types";
import { Button, useEnterSubmit, useMediaQuery } from "@dub/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";

export default function EditProjectForm({
  props,
  setShowEditProjectModal,
}: {
  props: EnrichedProjectProps;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { isMobile } = useMediaQuery();

  const formRef = useRef<HTMLFormElement>(null);
  const { handleKeyDown } = useEnterSubmit(formRef);

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
  });

  const [state, formAction] = useFormState<FormResponse, FormData>(
    editProject,
    null,
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as keyof typeof errors, {
          message: error.message,
        });
      });
    }

    if (state.status === "success") {
      revalidateProject(props.slug).then(() => {
        router.refresh();
        setShowEditProjectModal(false);
        toast.success("Project updated successfully");
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16"
    >
      <label htmlFor="name">
        <span className="text-sm font-medium text-gray-900">Project Name</span>
        <div className="relative mt-1">
          <input
            {...register("name")}
            autoFocus={!isMobile}
            required
            defaultValue={props.name}
            placeholder="Dub"
            className={`${
              errors.name
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.name) {
                clearErrors("name");
              }
            }}
          />
          {errors.name && (
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
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </label>
      <label htmlFor="description">
        <span className="text-sm font-medium text-gray-900">
          Project Description
        </span>
        <div className="relative mt-1">
          <TextareaAutosize
            {...register("description")}
            required
            minRows={3}
            onKeyDown={handleKeyDown}
            defaultValue={props.description}
            placeholder="Open-source link management infrastructure."
            className={`${
              errors.description
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.description) {
                clearErrors("description");
              }
            }}
          />
          {errors.description && (
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
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </label>
      <label htmlFor="github">
        <span className="text-sm font-medium text-gray-900">
          GitHub Repository
        </span>
        <div className="relative mt-1">
          <input
            {...register("github")}
            required
            defaultValue={props.githubLink.url}
            placeholder="https://github.com/dubinc/dub"
            className={`${
              errors.github
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.github) {
                clearErrors("github");
              }
            }}
          />
          {errors.github && (
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
        {errors.github && (
          <p className="mt-1 text-sm text-red-600">{errors.github.message}</p>
        )}
      </label>
      <label htmlFor="website">
        <span className="text-sm font-medium text-gray-900">Website</span>
        <div className="relative mt-1">
          <input
            {...register("website")}
            required
            defaultValue={props.websiteLink.url}
            placeholder="https://dub.co"
            className={`${
              errors.website
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.website) {
                clearErrors("website");
              }
            }}
          />
          {errors.website && (
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
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </label>
      <input type="hidden" name="projectId" value={props.id} />

      <FormButton disabled={false} />
    </form>
  );
}

const FormButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return <Button text="Save changes" loading={pending} disabled={disabled} />;
};

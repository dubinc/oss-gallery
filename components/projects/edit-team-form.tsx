"use client";

import { editTeam } from "@/lib/actions/edit-team";
import { revalidateProject } from "@/lib/actions/revalidate-project";
import { selectUser } from "@/lib/actions/select-user";
import {
  FormResponse,
  editTeamSchema,
  selectUserSchema,
} from "@/lib/actions/utils";
import { EnrichedProjectProps } from "@/lib/types";
import { Button, LoadingSpinner } from "@dub/ui";
import { cn } from "@dub/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { AlertCircle, CornerDownLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { buttonLinkVariants } from "../ui/button-link";

export default function EditTeamForm({
  props,
  setShowEditTeamModal,
}: {
  props: EnrichedProjectProps;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { users: projectUsers } = props;
  const [users, setUsers] =
    useState<EnrichedProjectProps["users"]>(projectUsers);

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof selectUserSchema>>({
    resolver: zodResolver(selectUserSchema),
  });

  const [state, formAction] = useFormState<
    FormResponse & { user?: User },
    FormData
  >(selectUser, null);

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

    if (state.status === "success" && state.user) {
      const { user: foundUser } = state;
      setUsers((prev) => {
        if (prev.some((user) => user.id === foundUser.id)) {
          return prev;
        }
        return [...prev, { ...foundUser, role: "Member" }];
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
      <form action={formAction}>
        <div className="relative">
          <input
            {...register("username")}
            required
            autoFocus
            autoComplete="off"
            data-1p-ignore
            placeholder="Search for a user"
            className={`${
              errors.username
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.username) {
                clearErrors("username");
              }
            }}
          />
          {errors.username ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          ) : (
            <LoadingInput />
          )}
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </form>
      <div className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white px-4 py-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="group relative flex items-center space-x-3 p-2"
          >
            <img
              src={user.image}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">{user.name}</p>
              <p
                className="-my-px border-b border-white pb-px text-sm text-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
                contentEditable
                onBlur={(e) => {
                  const newRole = e.currentTarget.textContent;
                  setUsers((prev) =>
                    prev.map((u) =>
                      u.id === user.id ? { ...u, role: newRole } : u,
                    ),
                  );
                }}
              >
                {user.role}
              </p>
            </div>
            <button
              className={cn(
                buttonLinkVariants({ variant: "secondary" }),
                "absolute inset-y-0 right-0 my-auto h-6 w-6 justify-center space-x-0 p-0 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
              )}
              onClick={() =>
                setUsers((prev) => prev.filter((u) => u.id !== user.id))
              }
            >
              <p className="sr-only">Remove user</p>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
      <EditTeamFormPseudo
        users={users}
        project={props}
        setShowEditTeamModal={setShowEditTeamModal}
      />
    </div>
  );
}

const LoadingInput = () => {
  const { pending } = useFormStatus();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      {pending ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-lg border border-gray-300 px-2 py-1">
          <CornerDownLeft className="h-3.5 w-3.5 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const EditTeamFormPseudo = ({
  users,
  project,
  setShowEditTeamModal,
}: {
  users: EnrichedProjectProps["users"];
  project: EnrichedProjectProps;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { register } = useForm<z.infer<typeof editTeamSchema>>({
    resolver: zodResolver(editTeamSchema),
  });

  const editTeamWithUsers = editTeam.bind(null, users);

  const [state, formAction] = useFormState<FormResponse, FormData>(
    editTeamWithUsers,
    null,
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }

    if (state.status === "success") {
      revalidateProject(project.slug).then(() => {
        router.refresh();
        setShowEditTeamModal(false);
        toast.success("Project updated successfully");
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input
        {...register("projectId")}
        type="hidden"
        value={project.id}
        readOnly
      />
      <FormButton />
    </form>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();
  return <Button text="Save changes" loading={pending} />;
};

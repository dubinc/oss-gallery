"use client";

import { editGradient } from "@/lib/actions/edit-gradient";
import { revalidateProject } from "@/lib/actions/revalidate-project";
import { FormResponse } from "@/lib/actions/utils";
import { EnrichedProjectProps } from "@/lib/types";
import {
  Label,
  LoadingSpinner,
  Popover,
  RadioGroup,
  RadioGroupItem,
  Tick,
} from "@dub/ui";
import { cn } from "@dub/utils";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { buttonLinkVariants } from "../ui/button-link";
import { PROJECT_GRADIENTS } from "./project-constants";

export function EditGradientPopoverClient({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover
      content={<EditGradientForm project={project} />}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        className={cn(
          buttonLinkVariants({ variant: "secondary" }),
          "space-x-0 px-1",
        )}
        onClick={() => setOpenPopover(!openPopover)}
      >
        <span className="sr-only">Edit Project Gradient</span>
        <Edit2 className="h-4 w-4" />
      </button>
    </Popover>
  );
}

const EditGradientForm = ({ project }: { project: EnrichedProjectProps }) => {
  const router = useRouter();

  const [state, formAction] = useFormState<FormResponse, FormData>(
    editGradient,
    null,
  );

  const [selectedGradient, setSelectedGradient] = useState(project.gradient);

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
        toast.success("Gradient updated successfully");
      });
    }
  }, [state]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction}>
      <RadioGroup
        name="gradient"
        className="grid grid-cols-3 gap-2 p-4"
        defaultValue={selectedGradient}
        onValueChange={(value) => {
          setSelectedGradient(value);
          formRef.current.requestSubmit();
        }}
      >
        {PROJECT_GRADIENTS.map((gradient) => (
          <div key={gradient} className="flex items-center">
            <RadioGroupItem
              value={gradient}
              id={gradient}
              className="peer pointer-events-none absolute opacity-0"
            />

            <Label
              htmlFor={gradient}
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gradient-to-tr",
                gradient,
                selectedGradient === gradient && "border-gray-700",
              )}
            >
              {selectedGradient === gradient && <Indicator />}
              <p className="sr-only">{gradient}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <input type="hidden" name="projectId" value={project.id} />
    </form>
  );
};

const Indicator = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <LoadingSpinner className="h-4 w-4" />
  ) : (
    <Tick className="h-4 w-4 text-black" />
  );
};

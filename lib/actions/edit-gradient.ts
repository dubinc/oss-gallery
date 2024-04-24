"use server";

import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { authProject } from "./auth";
import { FormResponse, editGradientSchema } from "./utils";

export async function editGradient(
  _prevState: any,
  data: FormData,
): Promise<FormResponse> {
  try {
    console.log(data.get("gradient"));
    const { gradient, projectId } = editGradientSchema.parse({
      gradient: data.get("gradient"),
      projectId: data.get("projectId"),
    });

    await authProject({ projectId });

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        gradient,
      },
    });

    return {
      status: "success",
      message: "Gradient updated successfully",
    };
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e);
      return {
        status: "error",
        message: "Invalid form data",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }
    return {
      status: "error",
      message: e.message,
    };
  }
}

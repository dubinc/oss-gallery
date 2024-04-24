"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { ZodError } from "zod";
import { FormResponse, selectUserSchema } from "./utils";

export async function selectUser(
  _prevState,
  data: FormData,
): Promise<FormResponse & { user?: User }> {
  try {
    const { username } = selectUserSchema.parse({
      username: data.get("username"),
    });

    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("You need to be logged in to edit a project");
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ZodError([
        {
          path: ["username"],
          code: "custom",
          message: "User not found",
        },
      ]);
    }

    return {
      status: "success",
      message: "User found",
      user,
    };
  } catch (e) {
    if (e instanceof ZodError) {
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

"use server";

import { revalidatePath } from "next/cache";

export async function revalidateProject(slug: string) {
  console.log("Revalidating project", slug);
  revalidatePath(`/projects/${slug}/[[...tab]]`, "page");
}

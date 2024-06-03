import { Project } from "@prisma/client";

export const sorts = ["stars", "newest", "alphabetical"] as const;

export type ProjectSorts = typeof sorts[number];

export const sortOptions: { display: string, slug: ProjectSorts }[] = [
  {
    display: "Number of Stars",
    slug: "stars",
  },
  {
    display: "Newest",
    slug: "newest",
  },
  {
    display: "A to Z",
    slug: "alphabetical",
  },
];

export type ProjectOrderBy = Record<ProjectSorts, Partial<Record<keyof Project, "asc" | "desc">>>;

export const sortOrderBy: ProjectOrderBy = {
  alphabetical: {
    name: "asc"
  },
  newest: {
    createdAt: "desc"
  },
  stars: {
    stars: "desc"
  }
}
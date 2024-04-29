import { Project } from "@prisma/client";
import Typesense from "typesense";
import { SearchResponseHit } from "typesense/lib/Typesense/Documents";

export type ProjectHit = SearchResponseHit<
  Pick<Project, "id" | "name" | "description" | "slug">
>;

const typesense = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      url: process.env.NEXT_PUBLIC_TYPESENSE_URL,
    },
  ],
  connectionTimeoutSeconds: 5,
});

export default typesense;

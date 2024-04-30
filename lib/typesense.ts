import { Project } from "@prisma/client";
import Typesense from "typesense";
import { SearchResponseHit } from "typesense/lib/Typesense/Documents";

export type ProjectHit = SearchResponseHit<
  Pick<Project, "id" | "name" | "description" | "slug" | "logo">
>;

const typesense = ({ client }: { client?: boolean } = {}) => {
  return new Typesense.Client({
    apiKey: client
      ? process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY
      : process.env.TYPESENSE_API_KEY,
    nodes: [
      {
        url: process.env.NEXT_PUBLIC_TYPESENSE_URL,
      },
    ],
    connectionTimeoutSeconds: 5,
  });
};

export default typesense;

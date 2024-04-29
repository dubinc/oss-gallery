import { Project } from "@prisma/client";
import Typesense from "typesense";
import { SearchResponseHit } from "typesense/lib/Typesense/Documents";

export type ProjectHit = SearchResponseHit<
  Pick<Project, "id" | "name" | "slug">
>;

const typesense = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
      port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 5,
});

export default typesense;

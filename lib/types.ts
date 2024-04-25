import { Link, Project } from "@prisma/client";

export interface EnrichedProjectProps extends Project {
  links: Link[];
  githubLink: Link;
  readme: string;
  websiteLink: Link | null;
  users: {
    id: string;
    role: string;
    name: string;
    username: string;
    image: string;
  }[];
}

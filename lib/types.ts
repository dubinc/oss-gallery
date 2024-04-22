import { Link, Project } from "@prisma/client";

export interface ProjectWithLinks extends Project {
  links: Link[];
  githubLink: Link;
  websiteLink: Link | null;
}

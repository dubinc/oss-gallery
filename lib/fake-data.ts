import { Project } from "@prisma/client";

export const fakeProjects: Project[] = [
  {
    id: "1",
    name: "Gallery",
    slug: "gallery",
    description: "A gallery of projects",
    stars: 100,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    links: [
      {
        type: "GITHUB",
        url: "https://github.com/dubinc/oss-gallery",
      },
      {
        type: "WEBSITE",
        url: "",
      },
    ],
    users: [],
  },
  {
    id: "2",
    name: "Dub",
    slug: "dub",
    description: "A dub project",
    stars: 200,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    links: [
      {
        type: "GITHUB",
        url: "https://github.com/dubinc/dub",
      },
      {
        type: "WEBSITE",
        url: "",
      },
    ],
    users: [],
  },
  {
    id: "3",
    name: "UI",
    slug: "ui",
    description: "A UI project",
    stars: 300,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    links: [
      {
        type: "GITHUB",
        url: "https://github.com/shadcn-ui/ui",
      },
      {
        type: "WEBSITE",
        url: "",
      },
    ],
    users: [],
  },
  {
    id: "4",
    name: "react",
    slug: "react",
    description: "A react project",
    stars: 400,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    links: [
      {
        type: "GITHUB",
        url: "https://github.com/facebook/react",
      },
      {
        type: "WEBSITE",
        url: "",
      },
    ],
    users: [],
  },
  {
    id: "5",
    name: "markdown-here",
    slug: "markdown-here",
    description: "A markdown project",
    stars: 500,
    verified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    links: [
      {
        type: "GITHUB",
        url: "https://github.com/adam-p/markdown-here",
      },
      {
        type: "WEBSITE",
        url: "",
      },
    ],
    users: [],
  },
];

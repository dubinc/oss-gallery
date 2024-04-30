import prisma from "@/lib/prisma";
import "dotenv-flow/config";
import * as fs from "fs";

async function main() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      logo: true,
      stars: true,
      clicks: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // save as JSONL
  const file = fs.createWriteStream("projects.jsonl");
  projects.forEach((project) => {
    file.write(JSON.stringify(project) + "\n");
  });
}

main();

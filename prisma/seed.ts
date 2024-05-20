import { LinkType, PrismaClient } from '@prisma/client';

import * as data from './data';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Database");

  console.log("Seeding User");

  const dubInc = await prisma.user.upsert({
    where: { email: 'dubinc@dub.co' },
    update: {},
    create: {
      email: 'dubinc@dub.co',
      name: 'Dub Inc',
      username: "dubinc",
      emailVerified: new Date(),
      image: "https://avatars.githubusercontent.com/u/153106492?s=200&v=4",
    },
  });

  console.log("User Seeded");

  console.log("Seeding Projects");

  const seedProjects = [...data.projects];

  while (seedProjects.length) {
    console.log(`Remaning ${seedProjects.length} projects`)
    const projects = seedProjects.splice(0, 8);

    const results = await Promise.allSettled(
      projects.map(async (project) => {
        const existingProject = await prisma.project.findUnique({
          where: {
            slug: project.slug
          }
        });

        if (existingProject) {
          return existingProject;
        }

        const links: { type: LinkType, shortLink: string, url: string }[] = []

        if (!!project.githubUrl) {
          links.push({
            type: "GITHUB",
            shortLink: project.githubUrl,
            url: project.githubUrl
          })
        }

        if (!!project.websiteUrl) {
          links.push({
            type: "WEBSITE",
            shortLink: project.websiteUrl,
            url: project.websiteUrl
          })
        }

        const createdProject = await prisma.project.create({
          data: {
            ...project,
            users: {
              create: {
                role: "Seed Submitter",
                userId: dubInc.id
              }
            },
            links: {
              createMany: {
                data: links
              }
            }
          }
        });

        return createdProject;
      })
    );

    const errors = results.filter(result => result.status === "rejected");

    if (errors.length) {
      console.log(errors);
    }
  }

  console.log("Projects Seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
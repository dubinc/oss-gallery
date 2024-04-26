import { dub } from "@/lib/dub";
import prisma from "@/lib/prisma";
import { getUrlWithRef } from "@/lib/utils";
import "dotenv-flow/config";

async function main() {
  const links = await prisma.link.findMany({
    take: 100,
    skip: 900,
    orderBy: {
      createdAt: "asc",
    },
  });

  links.forEach(async (link) => {
    const res = await dub.links.update(`ext_${link.id}`, {
      url: getUrlWithRef(link.url),
    });
    console.log({ res });
  });
}

main();

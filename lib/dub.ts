import prisma from "@/lib/prisma";
import { Link } from "@prisma/client";
import { Dub } from "dub";

export const dub = new Dub({
  workspaceId: "ws_clv9jxuxp0006gpq847kwrcwj",
});

export async function shortenAndCreateLink({
  url,
  type,
  projectId,
}: {
  url: string;
  type: "GITHUB" | "WEBSITE";
  projectId: string;
}) {
  const { shortLink } = await dub.links.create({ url });

  return await prisma.link.create({
    data: {
      type,
      url,
      shortLink,
      projectId,
    },
  });
}

export async function editShortLink({
  link,
  newUrl,
}: {
  link: Link;
  newUrl: string;
}) {
  const shortLinkUrl = new URL(link.shortLink);

  const { id: dubLinkId } = await dub.links.get({
    domain: shortLinkUrl.hostname,
    key: shortLinkUrl.pathname.slice(1),
  });

  await dub.links.update(dubLinkId, {
    url: newUrl,
  });

  return await prisma.link.update({
    where: {
      id: link.id,
    },
    data: {
      url: newUrl,
    },
  });
}

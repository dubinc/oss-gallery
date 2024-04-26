import type { Metadata } from "next";

export function constructMetadata({
  title = "OSS Gallery",
  description = "A collection of open-source projects built with Dub.",
  image = "https://oss.gallery/thumbnail.jpg",
}: {
  title?: string;
  description?: string;
  image?: string | null;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      creator: "@dubdotco",
    },
    metadataBase: new URL("https://oss.gallery"),
  };
}

export const getUrlWithRef = (url: string) => {
  const urlWithRef = new URL(url);
  urlWithRef.searchParams.set("ref", "ossgallery");

  return urlWithRef.toString();
};

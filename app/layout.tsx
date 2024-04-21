import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { cn, constructMetadata } from "@dub/utils";
import { inter, sfPro } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata = constructMetadata({
  title: "OSS Gallery",
  description: "A collection of open-source projects built with Dub.",
  image: "/opengraph-image.png",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(sfPro.variable, inter.variable)}>
      <body>
        <Providers>
          <Nav />
          <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 py-16">
            <div className="mx-auto min-h-screen w-full max-w-screen-md">
              {children}
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

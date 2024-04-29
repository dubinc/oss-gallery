"use client";

import { ContribInfo } from "@/lib/actions/get-contribs";
import { Github } from "@dub/ui";
import { cn } from "@dub/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
export function Contribs({
  contribs,
  className,
  renderContrib,
}: {
  contribs: ContribInfo[];
  className?: string;
  renderContrib?: (contrib: ContribInfo) => React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      {contribs.map((contrib, i) => {
        if (renderContrib) {
          return renderContrib(contrib);
        }
        return <Contrib key={i} info={contrib} />;
      })}
    </div>
  );
}

export function Contrib({ info }: { info: ContribInfo }) {
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={{
        initial: { zIndex: 0 },
        hover: { zIndex: 100 },
      }}
      initial="initial"
      animate={hover ? "hover" : "initial"}
      className=" relative drop-shadow-2xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        key={info.id}
        className="flex items-center"
        href={info.html_url}
        target="_blank"
      >
        <motion.div
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.5 },
          }}
          initial="initial"
          animate={hover ? "hover" : "initial"}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <div className="relative">
            <Image
              src={info.avatar_url}
              alt={info.login}
              width={48}
              height={48}
              className={cn(
                "rounded-full transition-opacity",
                loaded ? "opacity-100" : "opacity-0",
              )}
              unoptimized
              onLoadingComplete={() => {
                setLoaded(true);
              }}
            />
            {!loaded && (
              <span className="absolute left-0 top-0 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-gray-200/50 text-lg font-semibold text-gray-300">
                {info.login.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        </motion.div>
        <motion.div
          className="absolute left-1/2 flex min-w-[6rem] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-center shadow-md"
          variants={{
            hidden: { opacity: 0, scale: 0, translateX: "-50%", top: "50%" },
            visible: { opacity: 1, scale: 1, translateX: "-50%", top: "100%" },
          }}
          initial="hidden"
          animate={hover ? "visible" : "hidden"}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
        >
          <Github className="inline-block h-4 w-4" />
          <span className="text-gray-600">{info.login}</span>
        </motion.div>
      </a>
    </motion.div>
  );
}

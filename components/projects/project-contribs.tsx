"use client";

import { ContribInfo } from "@/lib/actions/get-contribs";
import { cn } from "@dub/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      <Link key={info.id} className="flex items-center" href={info.html_url}>
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
          <Image
            src={info.avatar_url}
            alt={info.login}
            width={48}
            height={48}
            className="rounded-full"
          />
        </motion.div>
        <motion.div
          className="absolute left-1/2 rounded-lg border border-white/60 bg-white/80 px-2 text-center drop-shadow-sm backdrop-blur-[2px]"
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
          <span className="text-lg">{info.login}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

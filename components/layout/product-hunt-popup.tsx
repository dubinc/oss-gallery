"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductHuntPopup() {
  const [hidden, setHidden] = useState(false);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="group fixed bottom-4 z-40 mx-2 rounded-lg border border-gray-200 bg-white p-2 pb-4 pr-4 shadow-md xs:left-4 xs:mx-auto xs:max-w-xs"
          initial={{ opacity: 0, translateY: 50 }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          exit={{ opacity: 0, y: "100%" }}
        >
          <div className="invisible absolute right-4 top-4 h-3 w-3 group-hover:invisible sm:visible">
            <div className="absolute inset-0 m-auto h-3 w-3 animate-ping items-center justify-center rounded-full bg-green-500" />
            <div className="absolute inset-0 z-10 m-auto h-3 w-3 rounded-full bg-green-500" />
          </div>
          <button
            className="visible absolute right-2.5 top-2.5 rounded-full p-1 transition-colors hover:bg-gray-100 active:scale-90 group-hover:visible sm:invisible"
            onClick={() => setHidden(true)}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
          <Link
            href="https://go.oss.gallery/ph?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dub"
            target="_blank"
          >
            <Image
              src="https://assets.dub.co/misc/product-hunt.png"
              alt="Product Hunt"
              width={100}
              height={100}
              className="h-24"
            />
            <div className="-mt-2 px-4">
              <p className="mb-1 font-medium text-gray-800">
                We're live on Product Hunt!
              </p>
              <p className="text-sm text-gray-500 underline-offset-4 transition-all group-hover:text-gray-800 group-hover:underline">
                Join the conversation and help us get to #1 Product of the Day
                ↗
              </p>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

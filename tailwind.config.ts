import sharedConfig from "@dub/tailwind-config/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@dub/ui/**/*.{mjs,js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          ...sharedConfig?.theme?.extend,
          fontFamily: {
            ...sharedConfig?.theme?.extend?.fontFamily,
            display: ["var(--font-sf)", "system-ui", "sans-serif"],
            default: ["var(--font-inter)", "system-ui", "sans-serif"],
          },
          animation: {
            ...sharedConfig?.theme?.extend?.animation,
            "fade-up": "fade-up 0.5s",
            "fade-down": "fade-down 0.5s",
            "skew-scroll": "skew-scroll 20s linear infinite",
            "infinite-scroll": "infinite-scroll 20s linear infinite",
          },
          keyframes: {
            ...sharedConfig?.theme?.extend?.keyframes,
            "fade-up": {
              "0%": {
                opacity: "0",
                transform: "translateY(10px)",
              },
              "80%": {
                opacity: "0.6",
              },
              "100%": {
                opacity: "1",
                transform: "translateY(0px)",
              },
            },
            "fade-down": {
              "0%": {
                opacity: "0",
                transform: "translateY(-10px)",
              },
              "80%": {
                opacity: "0.6",
              },
              "100%": {
                opacity: "1",
                transform: "translateY(0px)",
              },
            },
            "skew-scroll": {
              "0%": {
                transform:
                  "rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-20%)",
              },
              "100%": {
                transform:
                  "rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-120%)",
              },
            },
            "infinite-scroll": {
              "0%": {
                transform: "translateX(0)",
              },
              "100%": {
                transform: "translateX(-200%)",
              },
            },
          },
        },
      },
    },
  ],
};

export default config;

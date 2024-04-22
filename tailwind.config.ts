import sharedConfig from "@dub/tailwind-config/tailwind.config.ts";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        // Path to Dub module
        "./node_modules/@dub/ui/**/*.{mjs,js,ts,jsx,tsx}",
        // Path to Tremor module
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        transparent: "transparent",
        current: "currentColor",
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
          colors: {
            // light mode
            tremor: {
              brand: {
                faint: colors.blue[50],
                muted: colors.blue[200],
                subtle: colors.blue[400],
                DEFAULT: colors.blue[500],
                emphasis: colors.blue[700],
                inverted: colors.white,
              },
              background: {
                muted: colors.gray[50],
                subtle: colors.gray[100],
                DEFAULT: colors.white,
                emphasis: colors.gray[700],
              },
              border: {
                DEFAULT: colors.gray[200],
              },
              ring: {
                DEFAULT: colors.gray[200],
              },
              content: {
                subtle: colors.gray[400],
                DEFAULT: colors.gray[500],
                emphasis: colors.gray[700],
                strong: colors.gray[900],
                inverted: colors.white,
              },
            },
          },
          boxShadow: {
            // light
            "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            "tremor-card":
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "tremor-dropdown":
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
          borderRadius: {
            "tremor-small": "0.375rem",
            "tremor-default": "0.5rem",
            "tremor-full": "9999px",
          },
          fontSize: {
            "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
            "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
            "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
            "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
          },
        },
      },
      safelist: [
        {
          pattern:
            /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
          variants: ["hover", "ui-selected"],
        },
        {
          pattern:
            /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
          pattern:
            /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
          pattern:
            /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
      ],
      plugins: [...sharedConfig?.plugins, require("@headlessui/tailwindcss")],
    },
  ],
};

export default config;

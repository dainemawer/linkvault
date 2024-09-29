import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
		}
  },
  plugins: [require("tailwindcss-animate")], /* eslint-disable-line */
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // radial-gradient(circle at 15% 30%, rgba(130, 56, 255, 0.5) 0%, rgba(18, 18, 18, 0) 5%),
        // radial-gradient(circle at 85% 40%, rgba(154, 89, 255, 0.3) 0%, rgba(18, 18, 18, 0) 10%),
        'custom-gradient': `
          radial-gradient(circle at 5% 80%, rgba(115, 72, 200, 0.4) 0%, rgba(18, 18, 18, 0) 20%),
          radial-gradient(circle, rgba(44,15,98,1) 0%, rgba(18,18,18,1) 80%)
        `,
      },
    },
  },
  plugins: [],
};
export default config;

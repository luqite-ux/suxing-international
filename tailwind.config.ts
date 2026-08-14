import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: "#16a7da",
        skyglass: "#e9f8ff",
        ink: "#173047",
        champagne: "#c9a64a"
      },
      boxShadow: {
        airy: "0 24px 80px rgba(22, 167, 218, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
        ],
      },
      colors: {
        mintBg: "#D7E6DD",
        mintField: "#D7E6DD",
        mintAction: "#A4CEB5",
        mintActionHov: "#8DC3A9",
        mintText: "#97A198",
        mintLine: "#C0C0C0",
      },
      boxShadow: {
        card: "6px 6px 4px 0 rgba(126,144,133,0.25)",
        soft: "0 2px 6px rgba(17, 24, 39, 0.06)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
      ringColor: { mint: "#A4CEB5" },
    },
  },
  plugins: [],
};

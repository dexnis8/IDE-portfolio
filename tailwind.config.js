/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        editor: {
          bg: {
            primary: "#1E1E1E",
            secondary: "#252526",
            terminal: "#1A1A1A",
          },
          text: {
            primary: "#D4D4D4",
            secondary: "#858585",
            lineNumber: "#858585",
            activeLineNumber: "#C6C6C6",
          },
          syntax: {
            comment: "#6A9955",
            keyword: "#569CD6",
            string: "#CE9178",
            function: "#DCDCAA",
            variable: "#9CDCFE",
            type: "#4EC9B0",
          },
          accent: {
            primary: "#007ACC",
            secondary: "#0E639C",
            error: "#F14C4C",
            warning: "#CCA700",
            success: "#89D185",
          },
        },
      },
      fontFamily: {
        mono: ["Fira Code", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}; 
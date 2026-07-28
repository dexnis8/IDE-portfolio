/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── Kiro IDE Dark ──────────────────────────────── */
        kiro: {
          /* Backgrounds */
          workbench: "#19161d",   /* outermost shell */
          editor:    "#211d25",   /* editor / main content area */
          surface:   "#28242e",   /* sidebar, panels, inputs */
          elevated:  "#2f2b37",   /* hover rows, dropdowns */
          border:    "#3a3543",   /* subtle 1px borders */

          /* Text */
          text:      "#ffffff",
          muted:     "#938f9b",

          /* Accent (purple) */
          accent:    "#b080ff",
          accent2:   "#7138cc",   /* buttons, badges */

          /* Status */
          success:   "#80ffb5",
          error:     "#ff8080",
          warning:   "#ffcf99",

          /* Syntax */
          syn: {
            keyword:  "#e2d3fe",
            fn:       "#8dc8fb",
            class:    "#ffcf99",
            string:   "#80ffb5",
            variable: "#80f4ff",
            constant: "#ff80b5",
            comment:  "#ffffff66",
          },
        },

        /* ── Kiro IDE Light ─────────────────────────────── */
        "kiro-l": {
          workbench: "#dcdadf",
          editor:    "#f2f1f4",
          surface:   "#eae8ed",
          elevated:  "#e2dfe8",
          border:    "#c8c5cf",

          text:      "#352f3d",
          muted:     "#938f9b",

          accent:    "#7138cc",
          accent2:   "#8e47ff",

          success:   "#367c53",
          error:     "#993333",
          warning:   "#d08025",

          syn: {
            keyword:  "#876eb1",
            fn:       "#2d6a9f",
            class:    "#d08025",
            string:   "#367c53",
            variable: "#0c9aa7",
            constant: "#c80e5c",
            comment:  "#352f3d66",
          },
        },

        /* ── Legacy editor.* tokens (kept so Monaco / existing refs don't break) */
        editor: {
          bg: {
            primary:   "#211d25",
            secondary: "#28242e",
            terminal:  "#19161d",
          },
          text: {
            primary:          "#ffffff",
            secondary:        "#938f9b",
            lineNumber:       "#938f9b",
            activeLineNumber: "#e2d3fe",
          },
          syntax: {
            comment:  "#ffffff66",
            keyword:  "#e2d3fe",
            string:   "#80ffb5",
            function: "#8dc8fb",
            variable: "#80f4ff",
            type:     "#ffcf99",
          },
          accent: {
            primary:   "#b080ff",
            secondary: "#7138cc",
            error:     "#ff8080",
            warning:   "#ffcf99",
            success:   "#80ffb5",
          },
        },
      },

      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["Fira Code", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

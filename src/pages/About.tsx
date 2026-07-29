/**
 * About.tsx — Monaco editor view
 * Code copy reflects LandingPage identity: backend/distributed systems engineer.
 * Monaco theme adapts to dark/light via useTheme.
 */

import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

const aboutCode = `/**
 * about.ts — Isaac Ayorinde
 * Full-Stack Engineer(Backend Focused) · Node.js · .NET · Express
 */

interface Engineer {
  name:        string;
  title:       string;
  location:    string;
  focus:       string[];
  backend:     string[];
  frontend:    string[];
  databases:   string[];
  infra:       string[];
  tenets:      string[];
}

const isaac: Engineer = {
  name:     "Isaac Ayorinde",
  title:    "Backend Engineer",
  location: "Ibadan, Nigeria",
  
  focus: [
    "API design & engineering",
    "Real-time systems & WebSockets",
    "Distributed databases & event-driven architecture",
    "Zero-downtime deployments & SRE practices",
    "Blockchain research & decentralised systems",
  ],

  backend: [
    "Node.js", ".NET",
    "Express", "Nest.js", "GraphQL",
  ],

  frontend: [
    "React", "TypeScript", "Next.js",
    "Tailwind CSS", "Framer Motion",
  ],

  databases: [
    "PostgreSQL", "MySQL" "Redis", "MongoDB",
  ],

  infra: [
    "AWS", "GitHub Actions", "Docker", "NGINX", 
  ],

  tenets: [
    "Design for Failure.",
    "Automation over Effort.",
    "Explicit Over Clever.",
    "Prefer reversible decisions.",
  ],
};

/**
 *  // fun facts:
 *  * I'm currently exploring Rust.
 *  * Reach out if you're building something exciting.
 */

export default isaac;
`;

export default function About() {
  const { theme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={aboutCode}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        options={{
          readOnly: true,
          minimap: { enabled: true },
          fontSize: 13,
          lineHeight: 22,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
          fontLigatures: true,
          renderLineHighlight: "gutter",
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}

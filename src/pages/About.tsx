/**
 * About.tsx — Monaco editor view
 * Code copy reflects LandingPage identity: backend/distributed systems engineer.
 * Monaco theme adapts to dark/light via useTheme.
 */

import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

const aboutCode = `/**
 * about.ts — Isaac Ayorinde
 * Senior Full-Stack Engineer · Node.js · Go · Distributed Systems
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
  title:    "Senior Full-Stack Engineer",
  location: "Lagos, Nigeria",

  focus: [
    "High-throughput Node.js & Go APIs",
    "Distributed databases & event-driven architecture",
    "Zero-downtime deployments & SRE practices",
    "Blockchain research & decentralised systems",
  ],

  backend: [
    "Node.js", "Go", "Python",
    "Express", "Fastify", "gRPC", "GraphQL",
  ],

  frontend: [
    "React", "TypeScript", "Next.js",
    "Tailwind CSS", "Framer Motion",
  ],

  databases: [
    "PostgreSQL", "Redis", "ClickHouse",
    "MongoDB", "Kafka",
  ],

  infra: [
    "Docker", "Kubernetes", "Terraform",
    "AWS", "GitHub Actions", "ArgoCD",
    "Prometheus", "Grafana", "NGINX",
  ],

  tenets: [
    "Boring technology is good technology.",
    "Optimise for deletion.",
    "Observability is a first-class feature.",
    "Prefer reversible decisions.",
  ],
};

/**
 * I architect and scale backend systems.
 *
 * Over the past several years I have designed and operated infrastructure
 * handling millions of daily active users — from payment gateways processing
 * 18,000 TPS to real-time analytics pipelines with sub-10-second freshness.
 *
 * My approach: start with the simplest correct solution, instrument
 * everything from day one, and build systems that teammates can delete
 * without grief.
 *
 * Open to: Staff / Principal Engineering, Systems Architecture,
 *          Technical Leadership, and challenging greenfield builds.
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
          readOnly:            true,
          minimap:             { enabled: true },
          fontSize:            13,
          lineHeight:          22,
          lineNumbers:         "on",
          scrollBeyondLastLine: false,
          wordWrap:            "on",
          automaticLayout:     true,
          fontFamily:          "'Fira Code', 'JetBrains Mono', monospace",
          fontLigatures:       true,
          renderLineHighlight: "gutter",
          padding:             { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}

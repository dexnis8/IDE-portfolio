/**
 * Projects.tsx — Monaco editor view
 * Case studies match the LandingPage: Payment Gateway + Analytics Pipeline.
 */

import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

const projectsCode = `/**
 * projects.ts — Engineering Systems
 * Production case studies shipped by Isaac Ayorinde.
 */

interface CaseStudy {
  title:        string;
  period:       string;
  stack:        string[];
  problem:      string;
  architecture: string;
  impact:       string[];
  repo?:        string;
  live?:        string;
}

const caseStudies: CaseStudy[] = [
  {
    title:  "High-Throughput Payment Gateway",
    period: "2023 – 2024",
    stack:  ["Node.js", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],

    problem:
      "Legacy monolithic payment processor collapsing under 3× traffic \
growth, producing cascading timeouts during peak checkout windows.",

    architecture:
      "Decomposed into event-driven microservices using a CQRS pattern \
with Kafka as the event bus. PostgreSQL with read replicas and \
Redis-based idempotency keys eliminated duplicate-charge incidents. \
Blue/green deploys on ECS with automated canary rollback.",

    impact: [
      "Throughput scaled from 400 TPS → 18,000 TPS",
      "P99 latency reduced from 1.2 s → 94 ms",
      "Zero duplicate charges since migration",
      "Zero-downtime releases — release windows eliminated",
    ],
  },

  {
    title:  "Real-Time Analytics Pipeline",
    period: "2022 – 2023",
    stack:  ["Go", "ClickHouse", "AWS Kinesis", "Terraform", "Grafana"],

    problem:
      "Business-critical dashboards lagging 40+ minutes behind live data. \
ETL jobs were batch-based and brittle — a single failure stalled \
the entire pipeline for hours.",

    architecture:
      "Rewrote ingestion layer in Go using AWS Kinesis Data Streams for \
fan-out. ClickHouse replaced Redshift for columnar OLAP, delivering \
sub-second aggregation across billions of rows. Dead-letter queues \
and idempotent consumers eliminated data loss.",

    impact: [
      "Dashboard freshness: 40 min → < 8 seconds",
      "Infrastructure cost reduced by 34%",
      "Pipeline reliability: 99.97% uptime (was 94%)",
      "Onboarding new data sources: weeks → hours",
    ],
  },

  {
    title:  "Portfolio — Dev Mode IDE",
    period: "2024 – Present",
    stack:  ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],

    problem:
      "Typical portfolio sites feel static and disconnected from how \
engineers actually work. The goal was a portfolio that reflects \
the craft — interactive, opinionated, and built like a real product.",

    architecture:
      "VS Code / Kiro-inspired IDE shell with a landing page mode and a \
dev mode. Shared ViewModeContext persists preference to localStorage. \
Monaco Editor renders code-as-content. Interactive terminal with \
command history, autocomplete, and easter eggs.",

    impact: [
      "Dual-mode UX: premium landing page + fully functional IDE shell",
      "Kiro IDE theme with dark / light mode support",
      "Terminal with 15+ commands and hidden easter eggs",
      "Framer Motion scroll animations with prefers-reduced-motion support",
    ],

    live: "https://isaac-ayorinde.dev",
    repo: "https://github.com/dexnis8/portfolio",
  },
];

function displayProjects(): string {
  return caseStudies
    .map(
      (cs) => \`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀  \${cs.title}
    \${cs.period}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stack:
\${cs.stack.map((t) => \`  • \${t}\`).join("\\n")}

Problem:
  \${cs.problem}

Architecture:
  \${cs.architecture}

Impact:
\${cs.impact.map((i) => \`  ✓ \${i}\`).join("\\n")}
\${cs.live ? \`\\nLive:  \${cs.live}\` : ""}
\${cs.repo ? \`Repo:  \${cs.repo}\` : ""}
\`
    )
    .join("\\n");
}

console.log(displayProjects());
`;

export default function Projects() {
  const { theme } = useTheme();

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={projectsCode}
        theme={theme === "dark" ? "vs-dark" : "vs"}
        options={{
          readOnly:             true,
          minimap:              { enabled: true },
          fontSize:             13,
          lineHeight:           22,
          lineNumbers:          "on",
          scrollBeyondLastLine: false,
          wordWrap:             "on",
          automaticLayout:      true,
          fontFamily:           "'Fira Code', 'JetBrains Mono', monospace",
          fontLigatures:        true,
          renderLineHighlight:  "gutter",
          padding:              { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}

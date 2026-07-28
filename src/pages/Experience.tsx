/**
 * Experience.tsx — Monaco editor view
 * Work history and education consistent with LandingPage identity.
 */

import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

const experienceCode = `/**
 * experience.ts — Isaac Ayorinde
 * Engineering career timeline.
 */

interface Role {
  title:            string;
  company:          string;
  location:         string;
  period:           string;
  responsibilities: string[];
  stack:            string[];
}

interface Education {
  degree:       string;
  institution:  string;
  location:     string;
  period:       string;
  highlights:   string[];
}

class Career {

  private roles: Role[] = [
    {
      title:    "Senior Full-Stack Engineer",
      company:  "Fintech Scale-Up (Remote)",
      location: "Remote",
      period:   "2023 – Present",

      responsibilities: [
        "Architected event-driven payment microservices handling 18,000 TPS",
        "Led migration from MongoDB → PostgreSQL for relational query performance",
        "Implemented CQRS + Kafka event bus — eliminated duplicate charge incidents",
        "Introduced blue/green ECS deployments; zero downtime releases since Q1 2024",
        "Mentored 4 mid-level engineers; conducted weekly architecture reviews",
        "Defined SLOs and built Prometheus/Grafana observability stack from scratch",
      ],

      stack: [
        "Node.js", "Go", "PostgreSQL", "Redis",
        "Kafka", "Docker", "Kubernetes", "AWS ECS",
        "Terraform", "Prometheus", "Grafana",
      ],
    },

    {
      title:    "Full-Stack Engineer",
      company:  "SaaS Analytics Company",
      location: "Lagos, Nigeria",
      period:   "2022 – 2023",

      responsibilities: [
        "Rebuilt ETL pipeline in Go — dashboard freshness improved from 40 min → 8 s",
        "Migrated OLAP layer from Redshift to ClickHouse; 34% infra cost reduction",
        "Designed AWS Kinesis fan-out architecture for real-time event ingestion",
        "Built dead-letter queue system eliminating data loss on pipeline failures",
        "Delivered React/TypeScript dashboard consumed by 5,000+ business users",
      ],

      stack: [
        "Go", "React", "TypeScript", "ClickHouse",
        "AWS Kinesis", "Redshift", "Terraform",
        "GitHub Actions", "ArgoCD",
      ],
    },

    {
      title:    "Software Engineer",
      company:  "Product Agency",
      location: "Lagos, Nigeria",
      period:   "2020 – 2022",

      responsibilities: [
        "Developed full-stack web applications for 8+ client products",
        "Built RESTful and GraphQL APIs serving mobile and web clients",
        "Integrated Web3/Solidity smart contracts with React frontends",
        "Improved test coverage from 30% → 88% across critical service paths",
        "Collaborated with design team to ship pixel-perfect, accessible UIs",
      ],

      stack: [
        "Node.js", "React", "Python", "Django",
        "PostgreSQL", "MongoDB", "Solidity", "GraphQL",
        "Docker", "GCP",
      ],
    },
  ];

  private education: Education[] = [
    {
      degree:      "B.Sc. Computer Science",
      institution: "University of Lagos",
      location:    "Lagos, Nigeria",
      period:      "2016 – 2020",
      highlights: [
        "Second Class Upper Honours",
        "Final-year thesis: Scalable Consensus Mechanisms for Permissioned Blockchains",
        "Led university Programming & Algorithms Society (2 years)",
      ],
    },
  ];

  public summary(): string {
    const rolesOutput = this.roles.map((r) => \`
┌─────────────────────────────────────────────────┐
  \${r.title}
  \${r.company} · \${r.location}
  \${r.period}
└─────────────────────────────────────────────────┘

  Responsibilities:
\${r.responsibilities.map((x) => \`    ▸ \${x}\`).join("\\n")}

  Stack:  \${r.stack.join(" · ")}
\`).join("\\n");

    const eduOutput = this.education.map((e) => \`
  \${e.degree}
  \${e.institution} · \${e.location} · \${e.period}
\${e.highlights.map((h) => \`    • \${h}\`).join("\\n")}
\`).join("\\n");

    return \`
╔═══════════════════════════════════════════════════╗
║           ISAAC AYORINDE — CAREER HISTORY         ║
╚═══════════════════════════════════════════════════╝

── WORK EXPERIENCE ─────────────────────────────────
\${rolesOutput}

── EDUCATION ───────────────────────────────────────
\${eduOutput}
\`;
  }
}

const career = new Career();
console.log(career.summary());
`;

export default function Experience() {
  const { theme } = useTheme();

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={experienceCode}
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

/**
 * Projects.tsx — Monaco editor view
 * Case studies match the LandingPage: Payment Gateway + Analytics Pipeline.
 */

import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

const projectsCode = `/**
 * projects.ts — Engineering Systems
 * Production case studies.
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
    title:  "BigQuery Cost & Latency Optimization",
    stack:  ["Node.js", "BigQuery", "Redis"],
    problem:
      "Growing platform traffic caused identical HTTP requests \
       to repeatedly hit the database, increasing infrastructure \
       costs and slowing API response times.",

    architecture:
      "Introduced a Redis cache-aside layer with deterministic \
       cache keys and TTL-based expiration, serving frequently \
       requested business data from memory while keeping cached \
        records fresh.",

    impact: [
      "Eliminated redundant database reads",
      "Significantly reduced backend load",
      "Reduced BigQuery costs.",
    ],
  },

  {
    title:  "Serverless Web Scraping Engine",
    stack:  ["JavaScript", "GCP Functions", "PUPPETEER"],

    problem:
      "Manual market research and lead capture were bottlenecking \
       growth and time consuming for marketing team leading to reduced \
       productivity.",

    architecture:
      "Built a serverless scraping engine using JavaScript and \
       headless Chromium via Puppeteer. Deployed on Google Cloud \
       Functions with daily scheduled triggers to automatically \
       normalize and push data into Airtable via API.",

    impact: [
      "Eliminated manual efforts",
      "Improved productivity of the marketing team",
      "Automatically processing 500+ unique leads weekly",
    ],
  },

  {
    title:  "Crypto-to-Fiat Payment Infrastructure",
    stack:  ["C# .NET", "ASP.NET Core", "Webhooks"],
    problem:
      "Building a crypto-to-fiat payment platform required \
       reliable transaction processing, strict idempotency, \
       and secure non-custodial wallet management.",


    architecture:
      "Engineered a C# (.NET) payment service integrating \
       Quidax, Monnify, and Uniswap v4. Abstracted wallet management \
       through Turnkey, implemented webhook signature verification, and \
       built asynchronous retry queues for reliable payment processing.",


    impact: [
      "Enabled reliable crypto-to-fiat payment flows
      "Integrated with 3+ financial providers",
      "Processed 100+ transactions daily",
    ],
  },
];

function displayProjects(): string {
  return caseStudies
    .map(
      (cs) => \`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    \${cs.title}
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

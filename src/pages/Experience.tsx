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
    title:    "Backend Engineer",
    company:  "Design Tek Empire - Verified Fintech",
    location: "Ibadan, Nigeria (Remote)",
    period:   "Feb 2026 – Present",

    responsibilities: [
      "Built a secure crypto-to-fiat payment service using the Quidax API, implementing idempotent transaction handling",
      "Developed the backend for internal Naira transfers with Monnify, integrating webhooks and signature verification",
      "Engineered decentralized token swap functionality using Uniswap v4 for secure on-chain crypto exchanges",
      "Developed a secure wallet management service with Turnkey, automating wallet creation while abstracting private key management",
      "Improved payment reliability through asynchronous job queues, retry mechanisms, and structured logging",
      "Increased backend quality through rate limiting and comprehensive unit/integration testing of payment services",
    ],

    stack: [
      ".NET", "Quidax API", "Monnify", 
      "Uniswap v4", "Turnkey", "JWT",
    ],
  },

  {
    title:    "Backend Engineer",
    company:  "Openfair Technologies",
    location: "San Francisco, CA (Remote)",
    period:   "April 2025 – March 2026",

    responsibilities: [
      "Architected a Redis-backed hourly TTL cache for a BigQuery-backed API serving over 5,000 requests per minute",
      "Led the migration from a legacy BigQuery architecture to a real-time backend powered by Convex DB and Clerk Authentication",
      "Developed an automated web scraping pipeline with custom deduplication logic generating more than 500 qualified leads weekly",
      "Built Stripe webhook integrations with Airtable to synchronize subscription status in real time and automate customer outreach",
    ],

    stack: [
      "Node.js", "TypeScript", "Redis",
      "BigQuery", "Convex DB", "Clerk",
      "Stripe", "Airtable", "Playwright",
    ],
  },

  {
    title:    "Backend Developer",
    company:  "Feexet",
    location: "Abuja, Nigeria (Remote)",
    period:   "Sept 2023 – Feb 2025",

    responsibilities: [
      "Built a real-time messaging service using Node.js, Socket.io, and Redis for Teacher Bank App",
      "Developed secure REST APIs with authentication, Cloudinary-powered file uploads, and Google Maps integration",
      "Engineered backend services for CleenSweep App, implementing issue reporting, media uploads, approval workflows, scheduling, notifications, and rewards",
      "Contributed to the CleenSweep administrative dashboard by building APIs for issue moderation, operational coordination, and user management",
      "Designed and implemented the complete backend architecture for Tractrac App, including location-based tractor discovery, leasing workflows, and core business logic",
      "Developed asynchronous background jobs using BullMQ to automate scheduled operations and notification delivery",
    ],

    stack: [
      "Node.js", "Express.js", "Socket.io",
      "Redis", "MySQL", "BullMQ",
      "Cloudinary", "Google Maps API",
      "JWT", "REST API",
    ],
  },
];
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

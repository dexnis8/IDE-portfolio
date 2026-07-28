/**
 * LandingPage.tsx — Brutalist-Elegant Design
 * Premium engineering portfolio in the spirit of Linear / Vercel / Stripe.
 * Icons: react-icons  |  Animation: framer-motion
 */

import { useViewMode } from "../context/ViewModeContext";
import { useTheme } from "../context/ThemeContext";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiArrowUpRight,
  FiTerminal,
  // FiServer,
  // FiDatabase,
  // FiGitBranch,
  FiExternalLink,
  FiSun,
  FiMoon,
} from "react-icons/fi";
// import {
//   SiNodedotjs,
//   SiGo,
//   SiPostgresql,
//   SiRedis,
//   SiDocker,
//   SiAmazon,
//   SiKubernetes,
//   SiNginx,
//   SiTypescript,
//   SiGithub,
//   SiLinkedin,
// } from "react-icons/si";
import {
  SiNodedotjs,
  SiDotnet,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiAmazon,
  SiMysql,
  SiDocker,
  SiGithubactions,
  SiStripe,
  SiGooglecloud,
  SiNestjs,
  SiGithub,
  SiLinkedin,
} from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

/* ─── Caveat font (handwritten annotations) ────────────────────────────── */
const CaveatFontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap');
    .font-caveat { font-family: 'Caveat', cursive; }
  `}</style>
);

/* ─── Shared animation factory ─────────────────────────────────────────── */
function useFadeUp(reduced: boolean | null) {
  if (reduced) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, ease: "easeOut" },
  };
}

/* ─── Data ──────────────────────────────────────────────────────────────── */
const metrics = [
  // { value: "99.97%", label: "Uptime maintained" },
  // { value: "< 80ms", label: "P95 API Latency" },
  // { value: "12+", label: "Systems Shipped" },
  // { value: "20K+", label: "Daily Active Users" },
  { value: "100%", label: "Idempotent transactions" },
  { value: "15+", label: "Developers mentored" },
  { value: "300ms", label: "Avg latency reduced" },
  { value: "3+", label: "Years SaaS & FinTech" },
];

const caseStudies = [
  {
    title: "BigQuery Cost & Latency Optimization",
    tags: ["Node.js", "BigQuery", "Redis"],
    date: "2025 – 2026",
    problem:
      "Growing platform traffic caused identical HTTP requests to repeatedly hit the database, increasing infrastructure costs and slowing API response times.",
    architecture:
      "Introduced a Redis cache-aside layer with deterministic cache keys and TTL-based expiration, serving frequently requested business data from memory while keeping cached records fresh.",
    impact:
      "Eliminated redundant database reads, significantly reduced backend load and BigQuery costs.",
    hasAnnotation: true,
    annotation:
      "Instead of generic TTLs, I implemented cache warmups for peak usage times so cache misses never impacted end users.",
  },
  {
    title: "Serverless Web Scraping Engine",
    tags: ["JavaScript", "GCP Functions", "PUPPETEER"],
    date: "2022 – 2023",
    problem:
      "Manual market research and lead capture were bottlenecking growth and time consuming for marketing team leading to reduced productivity.",
    architecture:
      "Built a serverless scraping engine using JavaScript and headless Chromium via Puppeteer. Deployed on Google Cloud Functions with daily scheduled triggers to automatically normalize and push data into Airtable via API.",
    impact:
      "Completely eliminated manual effort, automatically processing 500+ verified leads weekly with zero server maintenance overhead.",
    hasAnnotation: false,
    annotation: "",
  },
  {
    title: "Crypto-to-Fiat Payment Infrastructure",
    tags: ["C# .NET", "ASP.NET Core", "Webhooks"],
    date: "2023 – Present",

    problem:
      "Building a crypto-to-fiat payment platform required reliable transaction processing, strict idempotency, and secure non-custodial wallet management.",

    architecture:
      "Engineered a C# (.NET) payment service integrating Quidax, Monnify, and Uniswap v4. Abstracted wallet management through Turnkey, implemented webhook signature verification, and built asynchronous retry queues for reliable payment processing.",

    impact:
      "Enabled reliable crypto-to-fiat payment flows, prevented duplicate transaction processing through idempotent handling, and automated secure non-custodial wallet provisioning.",
    hasAnnotation: true,
    annotation:
      "Combined idempotent state transitions, atomic state locks, and webhook signature verification to ensure duplicate or out-of-order webhook deliveries were safely ignored.",
  },
];

// const stack = [
//   { icon: <SiNodedotjs />, label: "Node.js" },
//   { icon: <SiGo />, label: "Go" },
//   { icon: <SiTypescript />, label: "TypeScript" },
//   { icon: <SiPostgresql />, label: "PostgreSQL" },
//   { icon: <SiRedis />, label: "Redis" },
//   { icon: <SiDocker />, label: "Docker" },
//   { icon: <SiKubernetes />, label: "Kubernetes" },
//   { icon: <SiAmazon />, label: "AWS" },
//   { icon: <SiNginx />, label: "NGINX" },
//   { icon: <FiDatabase />, label: "ClickHouse" },
//   { icon: <FiServer />, label: "Kafka" },
//   { icon: <FiGitBranch />, label: "Terraform" },
// ];

const stack = [
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiDotnet />, label: "C# (.NET)" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiRedis />, label: "Redis" },
  { icon: <SiAmazon />, label: "AWS" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiGithubactions />, label: "GitHub Actions" },
  { icon: <SiStripe />, label: "Stripe API" },
  { icon: <SiGooglecloud />, label: "Google Cloud" },
  { icon: <SiNestjs />, label: "NestJS" },
];

const tenets = [
  {
    title: "Design for Failure.",
    body: "In FinTech, the happy path is easy; edge cases are where companies lose money. I build systems that assume networks will fail, third-party APIs will time out and most importantly, I ensure that when things break, they fail gracefully and recover predictably.",
  },
  {
    title: "Automation over Effort.",
    body: "Developer time is a company’s most expensive asset. If a task requires manual intervention more than twice, it needs a script, a pipeline, or a cron job. Whether I am configuring CI/CD workflows via GitHub Actions or scraping unstructured data, my goal is always to build systems that run themselves.",
  },
  {
    title: "Explicit Over Clever.",
    body: "Clever code creates hidden bugs; explicit code creates maintainable systems. I favor predictable data flows, strict type safety, and readable logic over hyper-abstracted patterns or premature optimizations. If an engineer on call can't safely debug a module in 5 minutes during a 2 AM incident, it needs to be rewritten.",
  },
  {
    title: "Prefer reversible decisions.",
    body: "Architecture decisions made under uncertainty should favour optionality. A system that can change is more valuable than one that is theoretically optimal but impossible to evolve.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const { setViewMode } = useViewMode();
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const fadeUp = useFadeUp(reduced);

  /* ── Light / dark token maps ── */
  const t = {
    bg: theme === "dark" ? "#0A0A0A" : "#F5F4F2",
    surface: theme === "dark" ? "#121212" : "#ECEAE7",
    surfaceDeep: theme === "dark" ? "#0A0A0A" : "#E2E0DD",
    border: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
    text: theme === "dark" ? "#EDEDED" : "#1A1A1A",
    muted: theme === "dark" ? "#888888" : "#666666",
    accent: "#E55934",
    navBg: theme === "dark" ? "rgba(10,10,10,0.92)" : "rgba(245,244,242,0.92)",
  };

  return (
    <>
      <CaveatFontLink />

      {/* ─── Root shell ─────────────────────────────────────────────────── */}
      <div
        className="min-h-screen selection:bg-[#E55934]/30"
        style={{ backgroundColor: t.bg, color: t.text }}
      >
        {/* ══════════════════════════════════════════════════════════════════
            TOP NAV
        ══════════════════════════════════════════════════════════════════ */}
        <header
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
          style={{
            borderBottom: `1px solid ${t.border}`,
            backgroundColor: t.navBg,
          }}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            {/* Wordmark */}
            <span
              className="font-mono text-sm font-semibold tracking-widest"
              style={{ color: t.text }}
            >
              ISAAC<span style={{ color: t.accent }}>.</span>
            </span>

            {/* Nav links */}
            <nav className="flex items-center gap-6">
              <a
                href="#systems"
                className="font-mono text-xs uppercase tracking-widest transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                Systems
              </a>
              <a
                href="#stack"
                className="font-mono text-xs uppercase tracking-widest transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                Stack
              </a>
              <a
                href="https://docs.google.com/document/d/1Yt6xEsv3m1rpeyrrky9c6DvMK1aP2VD6StJFdsD_B2Q/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                Resume <FiExternalLink className="text-[10px]" />
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                style={{
                  border: `1px solid ${t.border}`,
                  backgroundColor: t.surface,
                  color: t.muted,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
              </button>

              {/* <button
                onClick={() => setViewMode("devMode")}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-all"
                style={{
                  border: `1px solid ${t.border}`,
                  backgroundColor: t.surface,
                  color: t.muted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.accent}66`;
                  e.currentTarget.style.color = t.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = t.border;
                  e.currentTarget.style.color = t.muted;
                }}
              >
                <FiTerminal style={{ color: t.accent }} />
                Dev Mode
              </button> */}
            </nav>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section className="flex min-h-[70vh] flex-col justify-center pt-24 pb-16">
          <div className="mx-auto max-w-5xl px-6">
            {/* Eyebrow */}
            <motion.p
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs tracking-widest"
              style={{ color: t.accent }}
            >
              [ STATUS: DEPLOYING SCALABLE SYSTEMS ]
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 font-mono text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl"
              style={{ color: t.text }}
            >
              I architect and scale
              <br />
              backend systems.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: t.muted }}
            >
              Backend Engineer specializing in scalable APIs, secure
              integrations, and resilient backend systems with Node.js and .NET.
              I solve complex problems with simple, dependable software
              architecture.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-10 flex flex-wrap  items-center gap-4"
            >
              {/* Primary CTA */}
              <button
                onClick={() => setViewMode("devMode")}
                className="sm:flex hidden items-center gap-2 rounded-md bg-[#E55934] px-5 py-2.5 font-mono text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                <FiTerminal />
                Open Dev Mode
              </button>

              {/* Secondary CTA */}
              <a
                href="#systems"
                className="flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm font-medium tracking-wide transition-colors"
                style={{
                  border: `1px solid ${t.border}`,
                  color: t.text,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = `${t.border.replace("0.08", "0.18").replace("0.09", "0.18")}`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = t.border)
                }
              >
                View Case Studies
                <FiArrowUpRight />
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mt-10 flex items-center gap-5"
            >
              <a
                href="https://github.com/dexnis8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-lg transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                <SiGithub />
              </a>
              <a
                href="https://linkedin.com/in/isaac-ayorinde"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-lg transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                <SiLinkedin />
              </a>
              <a
                href="https://x.com/dexnis8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-lg transition-colors"
                style={{ color: t.muted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
              >
                <RiTwitterXFill />
              </a>
              <span
                className="ml-1 h-px w-8"
                style={{ backgroundColor: t.border }}
              />
              <span className="font-mono text-xs" style={{ color: t.muted }}>
                {/* Based in Ibadan, NG */}
              </span>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            METRICS RIBBON
        ══════════════════════════════════════════════════════════════════ */}
        <section className="border-y" style={{ borderColor: t.border }}>
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  {...fadeUp}
                  transition={{
                    ...fadeUp.transition,
                    delay: reduced ? 0 : i * 0.07,
                  }}
                  className={`flex flex-col gap-1.5 px-6 py-8 ${i !== 0 ? "border-l" : ""} ${i >= 2 ? "max-md:border-t" : ""}`}
                  style={{ borderColor: t.border }}
                >
                  <span
                    className="font-mono text-3xl font-semibold md:text-4xl"
                    style={{ color: t.text }}
                  >
                    {m.value}
                  </span>
                  <span
                    className="font-sans text-[10px] uppercase tracking-widest"
                    style={{ color: t.muted }}
                  >
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SYSTEMS / CASE STUDIES
        ══════════════════════════════════════════════════════════════════ */}
        <section id="systems" className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            {/* Section header */}
            <motion.div {...fadeUp} className="mb-12">
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: t.accent }}
              >
                01 /
              </p>
              <h2
                className="mt-1 font-mono text-xl font-semibold"
                style={{ color: t.text }}
              >
                Systems & Architecture
              </h2>
            </motion.div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {caseStudies.map((cs, i) => (
                <motion.article
                  key={cs.title}
                  {...fadeUp}
                  transition={{
                    ...fadeUp.transition,
                    delay: reduced ? 0 : i * 0.1,
                  }}
                  className="relative overflow-hidden rounded-md p-8"
                  style={{
                    border: `1px solid ${t.border}`,
                    backgroundColor: t.surface,
                  }}
                >
                  {/* Handwritten annotation — first card only */}
                  {cs.hasAnnotation && (
                    <div
                      className="pointer-events-none absolute right-6 top-6 flex select-none flex-col items-start"
                      aria-hidden="true"
                      style={{ transform: "rotate(-2deg)" }}
                    >
                      {/* Arrow SVG */}
                      <svg
                        width="48"
                        height="32"
                        viewBox="0 0 48 32"
                        fill="none"
                        className="mb-0.5 ml-4"
                        style={{ transform: "scaleX(-1)", color: t.accent }}
                      >
                        <path
                          d="M44 4 C30 4, 8 10, 4 28"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M4 28 L10 22 M4 28 L12 29"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                      <span
                        className="font-caveat max-w-[200px] text-lg leading-snug"
                        style={{ color: t.accent }}
                      >
                        {cs.annotation}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-8 md:flex-row">
                    {/* Left column */}
                    <div className="flex-shrink-0 md:w-56">
                      <h3
                        className="text-base font-semibold leading-snug"
                        style={{ color: t.text }}
                      >
                        {cs.title}
                      </h3>

                      {/* Tech tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cs.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md px-2.5 py-1 font-mono text-[11px]"
                            style={{
                              border: `1px solid ${t.border}`,
                              backgroundColor: t.surfaceDeep,
                              color: t.muted,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Date */}
                      {/* <p
                        className="mt-5 font-mono text-xs"
                        style={{ color: t.muted }}
                      >
                        {cs.date}
                      </p> */}
                    </div>

                    {/* Divider */}
                    <div
                      className="hidden w-px self-stretch md:block"
                      style={{ backgroundColor: t.border }}
                    />

                    {/* Right column */}
                    <div className="flex flex-1 flex-col gap-5">
                      {/* Problem */}
                      <div>
                        <p
                          className="mb-1.5 font-mono text-[10px] uppercase tracking-widest"
                          style={{ color: t.accent }}
                        >
                          Problem
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: t.muted }}
                        >
                          {cs.problem}
                        </p>
                      </div>

                      {/* Architecture */}
                      <div>
                        <p
                          className="mb-1.5 font-mono text-[10px] uppercase tracking-widest"
                          style={{ color: `${t.text}99` }}
                        >
                          Architecture
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: t.muted }}
                        >
                          {cs.architecture}
                        </p>
                      </div>

                      {/* Impact */}
                      <div
                        className="rounded-md px-4 py-3"
                        style={{
                          border: `1px solid ${t.border}`,
                          backgroundColor: t.surfaceDeep,
                        }}
                      >
                        <p
                          className="mb-1.5 font-mono text-[10px] uppercase tracking-widest"
                          style={{ color: t.muted }}
                        >
                          Impact
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: t.text }}
                        >
                          {cs.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CORE STACK
        ══════════════════════════════════════════════════════════════════ */}
        <section
          id="stack"
          className="border-t py-24"
          style={{ borderColor: t.border }}
        >
          <div className="mx-auto max-w-5xl px-6">
            {/* Section header */}
            <motion.div {...fadeUp} className="mb-12">
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: t.accent }}
              >
                02 /
              </p>
              <h2
                className="mt-1 font-mono text-xl font-semibold"
                style={{ color: t.text }}
              >
                Infrastructure &amp; Languages
              </h2>
            </motion.div>

            {/* Chip grid */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: reduced ? 0 : 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {stack.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-md px-4 py-2.5 transition-colors"
                  style={{
                    border: `1px solid ${t.border}`,
                    backgroundColor: t.surface,
                  }}
                >
                  <span className="text-base" style={{ color: t.muted }}>
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs" style={{ color: t.text }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Horizontal rule with label */}
            <div className="mt-16 flex items-center gap-4">
              <span
                className="h-px flex-1"
                style={{ backgroundColor: t.border }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: t.muted }}
              >
                Also comfortable with
              </span>
              <span
                className="h-px flex-1"
                style={{ backgroundColor: t.border }}
              />
            </div>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: reduced ? 0 : 0.15 }}
              className="mt-6 font-mono text-xs leading-relaxed"
              style={{ color: t.muted }}
            >
              {/* React · Next.js · GraphQL · gRPC · Prometheus · Grafana ·
              Elasticsearch · RabbitMQ · GitHub Actions · ArgoCD */}
              React · Next.js · GraphQL · GitHub Actions
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ENGINEERING PHILOSOPHY / TENETS
        ══════════════════════════════════════════════════════════════════ */}
        <section className="border-t py-24" style={{ borderColor: t.border }}>
          <div className="mx-auto max-w-5xl px-6">
            {/* Section header */}
            <motion.div {...fadeUp} className="mb-12">
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: t.accent }}
              >
                03 /
              </p>
              <h2
                className="mt-1 font-mono text-xl font-semibold"
                style={{ color: t.text }}
              >
                My Tenets
              </h2>
            </motion.div>

            {/* 2-column tenet grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {tenets.map((t_item, i) => (
                <motion.div
                  key={t_item.title}
                  {...fadeUp}
                  transition={{
                    ...fadeUp.transition,
                    delay: reduced ? 0 : i * 0.08,
                  }}
                  className="flex flex-col gap-3 rounded-md p-6"
                  style={{
                    border: `1px solid ${t.border}`,
                    backgroundColor: t.surface,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 font-mono text-xs"
                      style={{ color: t.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-sm font-semibold leading-snug"
                      style={{ color: t.text }}
                    >
                      {t_item.title}
                    </h3>
                  </div>
                  <p
                    className="pl-7 text-sm leading-relaxed"
                    style={{ color: t.muted }}
                  >
                    {t_item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════════ */}
        <footer className="border-t py-10" style={{ borderColor: t.border }}>
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
            {/* Wordmark */}
            <span
              className="font-mono text-sm font-semibold"
              style={{ color: t.muted }}
            >
              ISAAC<span style={{ color: t.accent }}>.</span>AYO
            </span>

            {/* Nav */}
            <nav className="flex items-center gap-6">
              {[
                { href: "#systems", label: "Systems" },
                { href: "#stack", label: "Stack" },
                { href: "mailto:isaacayorinde442@gmail.com", label: "Contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-widest transition-colors"
                  style={{ color: t.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-5">
              {[
                {
                  href: "https://github.com/dexnis8",
                  icon: <SiGithub />,
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/isaac-ayorinde",
                  icon: <SiLinkedin />,
                  label: "LinkedIn",
                },
                {
                  href: "https://x.com/dexnis8",
                  icon: <RiTwitterXFill />,
                  label: "X",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors"
                  style={{ color: t.muted }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = t.muted)}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: `${t.muted}99` }}
            >
              © {new Date().getFullYear()} Isaac Ayorinde
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

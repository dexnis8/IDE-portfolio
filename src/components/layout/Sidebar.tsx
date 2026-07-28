/**
 * Sidebar.tsx — Kiro IDE file-explorer panel
 * Renders differently based on the activePanel prop from Layout.
 */

import { Link, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiCode,
  FiBriefcase,
  FiMail,
  FiExternalLink,
} from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";
import { useState } from "react";

type ActivityPanel = "explorer" | "search" | "git" | null;

interface SidebarProps {
  activePanel: ActivityPanel;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  lang: string /* language badge colour class */;
}

const navItems: NavItem[] = [
  {
    path: "/",
    label: "about.tsx",
    icon: <FiUser size={13} />,
    lang: "text-kiro-syn-variable dark:text-kiro-syn-variable light:text-kiro-l-syn-variable",
  },
  {
    path: "/projects",
    label: "projects.tsx",
    icon: <FiCode size={13} />,
    lang: "text-kiro-syn-fn dark:text-kiro-syn-fn light:text-kiro-l-syn-fn",
  },
  {
    path: "/experience",
    label: "experience.tsx",
    icon: <FiBriefcase size={13} />,
    lang: "text-kiro-syn-keyword dark:text-kiro-syn-keyword light:text-kiro-l-syn-keyword",
  },
  {
    path: "/contact",
    label: "contact.tsx",
    icon: <FiMail size={13} />,
    lang: "text-kiro-syn-string dark:text-kiro-syn-string light:text-kiro-l-syn-string",
  },
];

/* ── Explorer Panel ─────────────────────────────────────────────────────── */
function ExplorerPanel() {
  const location = useLocation();
  const [portfolioOpen, setPortfolioOpen] = useState(true);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2">
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-widest
                         text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted"
        >
          Explorer
        </span>
      </div>

      {/* Folder group */}
      <div className="flex-1 overflow-y-auto">
        {/* PORTFOLIO folder */}
        <button
          onClick={() => setPortfolioOpen((v) => !v)}
          className="flex w-full items-center gap-1 px-2 py-1.5 font-sans text-xs font-semibold
                     text-kiro-muted uppercase tracking-wider transition-colors
                     hover:text-kiro-text
                     dark:text-kiro-muted dark:hover:text-kiro-text
                     light:text-kiro-l-muted light:hover:text-kiro-l-text"
        >
          {portfolioOpen ? (
            <FiChevronDown size={12} />
          ) : (
            <FiChevronRight size={12} />
          )}
          isaac-ayorinde
        </button>

        {portfolioOpen && (
          <ul className="pb-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-2 px-6 py-[5px] font-mono text-[13px]
                      transition-colors
                      ${
                        active
                          ? "bg-kiro-elevated text-kiro-text dark:bg-kiro-elevated dark:text-kiro-text light:bg-kiro-l-elevated light:text-kiro-l-text"
                          : "text-kiro-muted hover:bg-kiro-elevated/60 hover:text-kiro-text dark:text-kiro-muted dark:hover:bg-kiro-elevated/60 dark:hover:text-kiro-text light:text-kiro-l-muted light:hover:bg-kiro-l-elevated/60 light:hover:text-kiro-l-text"
                      }`}
                  >
                    <span className={item.lang}>{item.icon}</span>
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-kiro-accent
                                       dark:bg-kiro-accent light:bg-kiro-l-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-kiro-border dark:border-kiro-border light:border-kiro-l-border" />

        {/* Profile card */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-md border border-kiro-border
                            dark:border-kiro-border light:border-kiro-l-border"
            >
              <img
                src="/isaac.jpg"
                alt="Isaac Ayorinde"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=Isaac+Ayorinde&background=7138cc&color=fff&size=80";
                }}
              />
            </div>
            <div className="min-w-0">
              <p
                className="truncate font-sans text-xs font-semibold text-kiro-text
                            dark:text-kiro-text light:text-kiro-l-text"
              >
                Isaac Ayorinde
              </p>
              <p
                className="truncate font-mono text-[10px] text-kiro-muted
                            dark:text-kiro-muted light:text-kiro-l-muted"
              >
                Senior Full-Stack Engineer
              </p>
            </div>
          </div>

          {/* Location */}
          <p
            className="mt-2 font-mono text-[10px] text-kiro-muted
                        dark:text-kiro-muted light:text-kiro-l-muted"
          >
            📍 Lagos, Nigeria
          </p>

          {/* Resume link */}
          <a
            href="https://docs.google.com/document/d/1Yt6xEsv3m1rpeyrrky9c6DvMK1aP2VD6StJFdsD_B2Q/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded
                       border border-kiro-accent/40 py-1.5 font-mono text-[11px]
                       text-kiro-accent transition-colors
                       hover:bg-kiro-accent/10
                       dark:border-kiro-accent/40 dark:text-kiro-accent dark:hover:bg-kiro-accent/10
                       light:border-kiro-l-accent/40 light:text-kiro-l-accent light:hover:bg-kiro-l-accent/10"
          >
            <FiExternalLink size={11} />
            View Resume
          </a>
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-kiro-border dark:border-kiro-border light:border-kiro-l-border" />

        {/* Social */}
        <div className="px-4 pb-4">
          <p
            className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest
                        text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted"
          >
            Connect
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://github.com/dexnis8",
                icon: <SiGithub size={16} />,
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/isaac-ayorinde",
                icon: <SiLinkedin size={16} />,
                label: "LinkedIn",
              },
              {
                href: "https://x.com/dexnis8",
                icon: <RiTwitterXFill size={16} />,
                label: "X",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-kiro-muted transition-colors hover:text-kiro-accent
                           dark:text-kiro-muted dark:hover:text-kiro-accent
                           light:text-kiro-l-muted light:hover:text-kiro-l-accent"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Search Panel ────────────────────────────────────────────────────────── */
function SearchPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-2">
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-widest
                         text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted"
        >
          Search
        </span>
      </div>
      <div className="px-3 pb-3">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full rounded border border-kiro-border bg-kiro-elevated px-3 py-1.5
                     font-mono text-xs text-kiro-text placeholder-kiro-muted outline-none
                     focus:border-kiro-accent transition-colors
                     dark:border-kiro-border dark:bg-kiro-elevated dark:text-kiro-text dark:placeholder-kiro-muted dark:focus:border-kiro-accent
                     light:border-kiro-l-border light:bg-kiro-l-elevated light:text-kiro-l-text light:placeholder-kiro-l-muted light:focus:border-kiro-l-accent"
        />
      </div>
      <div
        className="px-4 py-2 font-mono text-[11px] text-kiro-muted
                      dark:text-kiro-muted light:text-kiro-l-muted"
      >
        Type to search across files.
      </div>
    </div>
  );
}

/* ── Source Control Panel ────────────────────────────────────────────────── */
function GitPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-2">
        <span
          className="font-sans text-[10px] font-semibold uppercase tracking-widest
                         text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted"
        >
          Source Control
        </span>
      </div>
      <div
        className="px-4 py-2 font-mono text-[11px] text-kiro-muted
                      dark:text-kiro-muted light:text-kiro-l-muted space-y-2"
      >
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-kiro-success dark:bg-kiro-success light:bg-kiro-l-success" />
          Branch:{" "}
          <span className="text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
            main
          </span>
        </p>
        <p>No uncommitted changes.</p>
        <a
          href="https://github.com/dexnis8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-kiro-accent underline-offset-2 hover:underline
                     dark:text-kiro-accent light:text-kiro-l-accent"
        >
          <SiGithub size={11} /> View on GitHub
        </a>
      </div>
    </div>
  );
}

/* ── Root export ─────────────────────────────────────────────────────────── */
export default function Sidebar({ activePanel }: SidebarProps) {
  if (activePanel === "search") return <SearchPanel />;
  if (activePanel === "git") return <GitPanel />;
  return <ExplorerPanel />;
}

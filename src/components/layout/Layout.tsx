/**
 * Layout.tsx — Kiro IDE shell
 *
 * Structure mirrors Kiro IDE:
 *   [Title Bar]
 *   [Activity Bar (narrow icon strip)] | [Sidebar Panel] | [Editor + Terminal]
 *   [Status Bar]
 */

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Terminal from "./Terminal";
import Tabs from "./Tabs";
import { useViewMode } from "../../context/ViewModeContext";
import { useTheme } from "../../context/ThemeContext";
import { TerminalProvider } from "../../context/TerminalContext";
import {
  FiFolder,
  FiSearch,
  FiGitBranch,
  FiSettings,
  FiHome,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { SiGithub } from "react-icons/si";

interface LayoutProps {
  children: ReactNode;
}

type ActivityPanel = "explorer" | "search" | "git" | null;

export default function Layout({ children }: LayoutProps) {
  const { setViewMode } = useViewMode();
  const { theme, toggleTheme } = useTheme();
  const [activePanel, setActivePanel] = useState<ActivityPanel>("explorer");

  const togglePanel = (panel: ActivityPanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const activityItems = [
    { id: "explorer" as ActivityPanel, icon: <FiFolder size={20} />, label: "Explorer" },
    { id: "search"   as ActivityPanel, icon: <FiSearch size={20} />, label: "Search" },
    { id: "git"      as ActivityPanel, icon: <FiGitBranch size={20} />, label: "Source Control" },
  ];

  return (
    <TerminalProvider>
      {/* ── Root shell ──────────────────────────────────────────────────── */}
      <div className="flex h-screen flex-col overflow-hidden bg-kiro-workbench font-sans text-kiro-text
                      light:bg-kiro-l-workbench light:text-kiro-l-text">

        {/* ════════════════════════════════════════════════════════════════
            TITLE BAR
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex h-9 flex-shrink-0 items-center justify-between
                        border-b border-kiro-border bg-kiro-workbench px-3
                        dark:border-kiro-border dark:bg-kiro-workbench
                        light:border-kiro-l-border light:bg-kiro-l-workbench">

          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Breadcrumb / title */}
          <div className="flex items-center gap-1.5 font-mono text-xs text-kiro-muted
                          dark:text-kiro-muted light:text-kiro-l-muted">
            <span className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">
              isaac-ayorinde
            </span>
            <span>/</span>
            <span>portfolio</span>
            <span className="text-kiro-border dark:text-kiro-border light:text-kiro-l-border">—</span>
            <span>Dev Mode</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              className="rounded p-1 text-kiro-muted transition-colors
                         hover:bg-kiro-elevated hover:text-kiro-text
                         dark:hover:bg-kiro-elevated dark:hover:text-kiro-text
                         light:text-kiro-l-muted light:hover:bg-kiro-l-elevated light:hover:text-kiro-l-text"
            >
              {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>

            {/* Back to landing */}
            <button
              onClick={() => setViewMode("landing")}
              title="Back to Portfolio"
              className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px]
                         text-kiro-muted transition-colors
                         hover:bg-kiro-elevated hover:text-kiro-text
                         dark:hover:bg-kiro-elevated dark:hover:text-kiro-text
                         light:text-kiro-l-muted light:hover:bg-kiro-l-elevated light:hover:text-kiro-l-text"
            >
              <FiHome size={12} />
              Portfolio
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            BODY  (activity bar | sidebar | editor)
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Activity Bar ──────────────────────────────────────────── */}
          <div className="flex w-12 flex-shrink-0 flex-col items-center
                          border-r border-kiro-border bg-kiro-workbench py-2
                          dark:border-kiro-border dark:bg-kiro-workbench
                          light:border-kiro-l-border light:bg-kiro-l-workbench">

            {/* Top icons */}
            <div className="flex flex-col gap-1">
              {activityItems.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => togglePanel(id)}
                  title={label}
                  className={`relative flex h-10 w-10 items-center justify-center rounded transition-colors
                    ${activePanel === id
                      ? "text-kiro-text dark:text-kiro-text light:text-kiro-l-text"
                      : "text-kiro-muted hover:text-kiro-text dark:text-kiro-muted dark:hover:text-kiro-text light:text-kiro-l-muted light:hover:text-kiro-l-text"
                    }`}
                >
                  {/* Active indicator bar on left edge */}
                  {activePanel === id && (
                    <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r
                                     bg-kiro-accent dark:bg-kiro-accent light:bg-kiro-l-accent" />
                  )}
                  {icon}
                </button>
              ))}
            </div>

            {/* Bottom icons */}
            <div className="mt-auto flex flex-col gap-1">
              <a
                href="https://github.com/dexnis8"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded text-kiro-muted
                           transition-colors hover:text-kiro-text
                           dark:text-kiro-muted dark:hover:text-kiro-text
                           light:text-kiro-l-muted light:hover:text-kiro-l-text"
              >
                <SiGithub size={18} />
              </a>
              <button
                onClick={toggleTheme}
                title={theme === "dark" ? "Light mode" : "Dark mode"}
                className="flex h-10 w-10 items-center justify-center rounded text-kiro-muted
                           transition-colors hover:text-kiro-text
                           dark:text-kiro-muted dark:hover:text-kiro-text
                           light:text-kiro-l-muted light:hover:text-kiro-l-text"
              >
                {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <button
                title="Settings (coming soon)"
                className="flex h-10 w-10 items-center justify-center rounded text-kiro-muted
                           transition-colors hover:text-kiro-text
                           dark:text-kiro-muted dark:hover:text-kiro-text
                           light:text-kiro-l-muted light:hover:text-kiro-l-text"
              >
                <FiSettings size={18} />
              </button>
            </div>
          </div>

          {/* ── Sidebar Panel (collapsible) ───────────────────────────── */}
          {activePanel && (
            <div className="w-60 flex-shrink-0 overflow-hidden
                            border-r border-kiro-border bg-kiro-surface
                            dark:border-kiro-border dark:bg-kiro-surface
                            light:border-kiro-l-border light:bg-kiro-l-surface">
              <Sidebar activePanel={activePanel} />
            </div>
          )}

          {/* ── Editor Column (tabs + content + terminal) ─────────────── */}
          <div className="flex flex-1 flex-col overflow-hidden">

            {/* Tab bar */}
            <div className="flex h-9 flex-shrink-0 items-stretch overflow-x-auto
                            border-b border-kiro-border bg-kiro-workbench
                            dark:border-kiro-border dark:bg-kiro-workbench
                            light:border-kiro-l-border light:bg-kiro-l-workbench">
              <Tabs />
            </div>

            {/* Editor content */}
            <main className="flex-1 overflow-auto bg-kiro-editor
                             dark:bg-kiro-editor light:bg-kiro-l-editor">
              {children}
            </main>

            {/* Terminal */}
            <Terminal />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            STATUS BAR
        ════════════════════════════════════════════════════════════════ */}
        <div className="flex h-6 flex-shrink-0 items-center justify-between
                        bg-kiro-accent2 px-3
                        dark:bg-kiro-accent2 light:bg-kiro-l-accent2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono text-[10px] text-white/90">
              <FiGitBranch size={10} />
              main
            </span>
            <span className="font-mono text-[10px] text-white/70">
              isaac-ayorinde / portfolio
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/70">TypeScript</span>
            <span className="font-mono text-[10px] text-white/70">UTF-8</span>
            <button
              onClick={() => setViewMode("landing")}
              className="font-mono text-[10px] text-white/90 transition-opacity hover:opacity-70"
            >
              ← Portfolio
            </button>
          </div>
        </div>

      </div>
    </TerminalProvider>
  );
}

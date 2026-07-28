/**
 * Terminal.tsx — Kiro IDE integrated terminal
 * Kiro purple/dark palette. Draggable resize handle. Full command set.
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useTerminal } from "../../context/TerminalContext";
import {
  FiChevronDown,
  FiChevronUp,
  FiMaximize2,
  FiMinimize2,
  FiTerminal,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

interface Command {
  input: string;
  output: string | JSX.Element;
}

/* ─── Skills data (updated to match LandingPage) ──────────────────────── */
const SKILLS = {
  backend:    ["Node.js", "Go", "Python", "Express", "Fastify", "gRPC", "GraphQL"],
  frontend:   ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  database:   ["PostgreSQL", "Redis", "ClickHouse", "MongoDB", "MySQL"],
  devops:     ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "ArgoCD"],
  tools:      ["NGINX", "Kafka", "Prometheus", "Grafana", "Elasticsearch"],
};

/* ─── Easter eggs ─────────────────────────────────────────────────────── */
const MatrixAnimation = () => (
  <div className="font-mono text-xs text-kiro-success dark:text-kiro-success light:text-kiro-l-success">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="my-0.5 opacity-80">
        {Array.from({ length: Math.floor(Math.random() * 28) + 8 }).map((_, j) => (
          <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
        ))}
      </div>
    ))}
    <div className="mt-2 text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
      Matrix mode activated. Welcome to the digital realm.
    </div>
  </div>
);

const EASTER_EGGS: Record<string, string | JSX.Element> = {
  sudo:   "Nice try. You don't have root in this browser.",
  matrix: <MatrixAnimation />,
  coffee: "Error: Coffee machine not found. Virtual ☕ incoming.",
  hello:  "Hello there. Ready to build something great?",
  ping:   "pong 🏓",
  flip:   "(╯°□°）╯︵ ┻━┻",
  unflip: "┬─┬ ノ( ゜-゜ノ)",
  party:  "🎉 🎊 🎈 Let's ship it! 🚀",
  joke:   "Why do engineers prefer dark mode? Because light attracts bugs.",
  quote:  '"Move fast, but make things that last." — Unknown SRE',
  konami: "⬆⬆⬇⬇⬅➡⬅➡ BA — Unlimited uptime unlocked! (not really)",
};

const AVAILABLE_COMMANDS = [
  "help", "about", "projects", "experience", "contact",
  "skills", "skills backend", "skills frontend", "skills database",
  "skills devops", "skills tools",
  "theme", "view cv", "clear", "social", "history",
];

export default function Terminal() {
  const [commands, setCommands]           = useState<Command[]>([]);
  const [currentInput, setCurrentInput]   = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex]   = useState(-1);
  const [suggestions, setSuggestions]     = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [konamiIndex, setKonamiIndex]     = useState(0);
  const [isDragging, setIsDragging]       = useState(false);

  const inputRef        = useRef<HTMLInputElement>(null);
  const terminalRef     = useRef<HTMLDivElement>(null);
  const dragStartYRef   = useRef<number>(0);
  const dragStartHRef   = useRef<number>(0);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    terminalState,
    terminalHeight,
    setTerminalHeight,
    toggleTerminal,
    maximizeTerminal,
  } = useTerminal();

  const konamiCode = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a",
  ];

  /* auto-scroll */
  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [commands]);

  /* welcome message */
  useEffect(() => {
    setCommands([{
      input: "",
      output: (
        <span className="text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted">
          Welcome to <span className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">isaac-ayorinde</span> terminal.
          Type <span className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">help</span> for available commands.
        </span>
      ),
    }]);
  }, []);

  /* suggestions */
  useEffect(() => {
    if (currentInput.trim()) {
      setSuggestions(
        AVAILABLE_COMMANDS.filter((c) => c.startsWith(currentInput.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  /* konami listener */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        const next = konamiIndex + 1;
        setKonamiIndex(next);
        if (next === konamiCode.length) { handleCommand("konami"); setKonamiIndex(0); }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [konamiIndex]);

  /* drag resize */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = dragStartYRef.current - e.clientY;
      setTerminalHeight(dragStartHRef.current + delta);
    };
    const onUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, setTerminalHeight]);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartHRef.current = terminalHeight;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setShowSuggestions(false);
      if (historyIndex < commandHistory.length - 1) {
        const i = historyIndex + 1;
        setHistoryIndex(i);
        setCurrentInput(commandHistory[commandHistory.length - 1 - i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowSuggestions(false);
      if (historyIndex > 0) {
        const i = historyIndex - 1;
        setHistoryIndex(i);
        setCurrentInput(commandHistory[commandHistory.length - 1 - i]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) { setCurrentInput(suggestions[0]); setSuggestions([]); setShowSuggestions(false); }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleCommand = (cmd: string) => {
    const parts = cmd.toLowerCase().trim().split(" ");
    const main  = parts[0];
    const args  = parts.slice(1);

    if (cmd.trim()) {
      setCommandHistory((p) => [...p, cmd]);
      setHistoryIndex(-1);
    }
    setShowSuggestions(false);

    /* easter eggs */
    if (main in EASTER_EGGS) {
      setCommands((p) => [...p, { input: cmd, output: EASTER_EGGS[main] }]);
      return;
    }

    let output: string | JSX.Element = "Command not found. Type 'help' for available commands.";

    const accent = (s: string) => (
      <span className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">{s}</span>
    );

    switch (main) {
      case "help":
        output = (
          <div className="space-y-1">
            <p className="mb-2 font-semibold text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
              Available commands:
            </p>
            {[
              ["help",       "Show this message"],
              ["about",      "Navigate → about.tsx"],
              ["projects",   "Navigate → projects.tsx"],
              ["experience", "Navigate → experience.tsx"],
              ["contact",    "Navigate → contact.tsx"],
              ["skills",     "List skill categories (try: skills backend)"],
              ["theme",      "Toggle dark / light mode"],
              ["view cv",    "Open resume in new tab"],
              ["social",     "Print social links"],
              ["history",    "Print command history"],
              ["clear",      "Clear terminal"],
            ].map(([c, d]) => (
              <p key={c}>{accent(c.padEnd(14, " "))}  {d}</p>
            ))}
            <p className="mt-3 text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted text-[11px]">
              ↑/↓ history · Tab autocomplete · Easter eggs hidden 🥚
            </p>
          </div>
        );
        break;

      case "about":      output = "Navigating to about.tsx…";      navigate("/");           break;
      case "projects":   output = "Navigating to projects.tsx…";   navigate("/projects");   break;
      case "experience": output = "Navigating to experience.tsx…"; navigate("/experience"); break;
      case "contact":    output = "Navigating to contact.tsx…";    navigate("/contact");    break;

      case "skills":
        if (args.length && args[0] in SKILLS) {
          const cat = args[0] as keyof typeof SKILLS;
          output = (
            <div>
              <p className="mb-1 font-semibold capitalize">{cat} skills:</p>
              <ul className="list-disc pl-5">
                {SKILLS[cat].map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          );
        } else {
          output = (
            <div>
              <p className="mb-1 font-semibold">Skill categories:</p>
              <ul className="list-disc pl-5">
                {Object.keys(SKILLS).map((c) => <li key={c}>{accent(c)}</li>)}
              </ul>
            </div>
          );
        }
        break;

      case "theme":
        toggleTheme();
        output = `Switched to ${theme === "dark" ? "light" : "dark"} mode.`;
        break;

      case "view":
        if (args[0] === "cv") {
          window.open(
            "https://docs.google.com/document/d/1E0Aov4wXCu_qHufc6hvh46haPer1P6C0P2gezeVmlJA/edit?usp=sharing",
            "_blank", "noopener,noreferrer"
          );
          output = "Opening resume in a new tab…";
        } else {
          output = "Usage: view cv";
        }
        break;

      case "clear":
        setCommands([]);
        return;

      case "social":
        output = (
          <div className="space-y-1">
            <p className="font-semibold text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
              Connect with Isaac:
            </p>
            {[
              ["GitHub",   "https://github.com/dexnis8",             "github.com/dexnis8"],
              ["LinkedIn", "https://linkedin.com/in/isaac-ayorinde", "linkedin.com/in/isaac-ayorinde"],
              ["X",        "https://x.com/dexnis8",                  "x.com/dexnis8"],
            ].map(([label, href, text]) => (
              <p key={label}>
                {accent(label + ":")}
                {" "}
                <a href={href} target="_blank" rel="noopener noreferrer"
                   className="underline underline-offset-2 hover:text-kiro-accent dark:hover:text-kiro-accent light:hover:text-kiro-l-accent">
                  {text}
                </a>
              </p>
            ))}
          </div>
        );
        break;

      case "history":
        output = commandHistory.length === 0
          ? "No history yet."
          : (
            <div>
              <p className="mb-1 font-semibold">Command history:</p>
              <ol className="list-decimal pl-5">
                {commandHistory.map((c, i) => <li key={i}>{c}</li>)}
              </ol>
            </div>
          );
        break;
    }

    setCommands((p) => [...p, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) { handleCommand(currentInput); setCurrentInput(""); }
  };

  const isExpanded = terminalState !== "collapsed";

  return (
    <div
      className="flex flex-col border-t border-kiro-border bg-kiro-workbench font-mono text-sm
                 dark:border-kiro-border dark:bg-kiro-workbench
                 light:border-kiro-l-border light:bg-kiro-l-workbench"
      style={{ height: terminalHeight }}
    >
      {/* ── Header / drag handle ───────────────────────────────────────── */}
      <div
        className="flex flex-shrink-0 cursor-ns-resize select-none items-center justify-between
                   border-b border-kiro-border px-3 py-1.5
                   dark:border-kiro-border light:border-kiro-l-border"
        onMouseDown={startDrag}
      >
        {/* Left: terminal tabs */}
        <div className="flex items-center gap-3">
          {/* Tab label */}
          <div className="flex items-center gap-1.5 border-b-2 border-kiro-accent pb-1
                          dark:border-kiro-accent light:border-kiro-l-accent">
            <FiTerminal size={12}
              className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent" />
            <span className="text-[11px] text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
              zsh
            </span>
          </div>

          {/* New terminal icon */}
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="text-kiro-muted hover:text-kiro-text transition-colors
                       dark:text-kiro-muted dark:hover:text-kiro-text
                       light:text-kiro-l-muted light:hover:text-kiro-l-text"
          >
            <FiPlus size={13} />
          </button>
        </div>

        {/* Right: window controls */}
        <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => setCommands([])}
            title="Clear"
            className="rounded p-1 text-kiro-muted transition-colors hover:text-kiro-error
                       dark:text-kiro-muted dark:hover:text-kiro-error
                       light:text-kiro-l-muted light:hover:text-kiro-l-error"
          >
            <FiTrash2 size={12} />
          </button>

          {terminalState !== "collapsed" && (
            <button
              onClick={maximizeTerminal}
              title={terminalState === "maximized" ? "Restore" : "Maximise"}
              className="rounded p-1 text-kiro-muted transition-colors hover:text-kiro-text
                         dark:text-kiro-muted dark:hover:text-kiro-text
                         light:text-kiro-l-muted light:hover:text-kiro-l-text"
            >
              {terminalState === "maximized"
                ? <FiMinimize2 size={12} />
                : <FiMaximize2 size={12} />}
            </button>
          )}

          <button
            onClick={toggleTerminal}
            title={isExpanded ? "Collapse" : "Expand"}
            className="rounded p-1 text-kiro-muted transition-colors hover:text-kiro-text
                       dark:text-kiro-muted dark:hover:text-kiro-text
                       light:text-kiro-l-muted light:hover:text-kiro-l-text"
          >
            {isExpanded ? <FiChevronDown size={12} /> : <FiChevronUp size={12} />}
          </button>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      {isExpanded && (
        <div
          className="flex h-full flex-col px-4 py-2"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Output history */}
          <div ref={terminalRef} className="flex-1 overflow-auto pb-2 space-y-2.5">
            {commands.map((cmd, i) => (
              <div key={i}>
                {cmd.input && (
                  <div className="flex items-center gap-2">
                    {/* Kiro-style prompt: user@host $ */}
                    <span className="select-none text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">
                      isaac
                    </span>
                    <span className="select-none text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted">@portfolio</span>
                    <span className="select-none text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted">$</span>
                    <span className="text-kiro-text dark:text-kiro-text light:text-kiro-l-text">
                      {cmd.input}
                    </span>
                  </div>
                )}
                <div className="ml-0 mt-0.5 text-kiro-text/80 dark:text-kiro-text/80 light:text-kiro-l-text/80">
                  {cmd.output}
                </div>
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="relative flex-shrink-0">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-kiro-border pt-2
                         dark:border-kiro-border light:border-kiro-l-border"
            >
              <span className="select-none text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">
                isaac
              </span>
              <span className="select-none text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted">@portfolio</span>
              <span className="select-none text-kiro-muted dark:text-kiro-muted light:text-kiro-l-muted">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => currentInput.trim() && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                className="flex-1 bg-transparent text-kiro-text outline-none caret-kiro-accent
                           dark:text-kiro-text dark:caret-kiro-accent
                           light:text-kiro-l-text light:caret-kiro-l-accent"
                autoFocus
                aria-label="Terminal input"
                spellCheck={false}
              />
            </form>

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 mb-1 max-h-40 w-56 overflow-y-auto
                              rounded border border-kiro-border bg-kiro-surface shadow-lg
                              dark:border-kiro-border dark:bg-kiro-surface
                              light:border-kiro-l-border light:bg-kiro-l-surface">
                {suggestions.map((s) => (
                  <div
                    key={s}
                    className="cursor-pointer px-3 py-1.5 text-[12px] text-kiro-text
                               hover:bg-kiro-elevated
                               dark:text-kiro-text dark:hover:bg-kiro-elevated
                               light:text-kiro-l-text light:hover:bg-kiro-l-elevated"
                    onMouseDown={() => {
                      setCurrentInput(s);
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

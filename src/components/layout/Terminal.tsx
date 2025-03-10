import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useTerminal } from "../../context/TerminalContext";
import {
  FaChevronDown,
  FaChevronUp,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

interface Command {
  input: string;
  output: string | JSX.Element;
}

// Skills data
const SKILLS = {
  frontend: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Redux",
  ],
  backend: [
    "Node.js",
    "Express",
    "Python",
    "Django",
    "GraphQL",
    "RESTful APIs",
  ],
  database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  devops: ["Docker", "Git", "CI/CD", "AWS", "Vercel", "Netlify"],
  tools: ["VS Code", "Figma", "Postman", "Jest", "Webpack"],
};

// Easter egg matrix animation
const MatrixAnimation = () => {
  return (
    <div className="font-mono text-xs text-green-500">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="my-0.5">
          {Array.from({ length: Math.floor(Math.random() * 30) + 10 }).map(
            (_, j) => (
              <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
            )
          )}
        </div>
      ))}
      <div className="mt-2 text-white">
        Matrix mode activated. Welcome to the digital realm.
      </div>
    </div>
  );
};

// Available commands for autocompletion (excluding easter eggs)
const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "projects",
  "experience",
  "contact",
  "skills",
  "skills frontend",
  "skills backend",
  "skills database",
  "skills devops",
  "skills tools",
  "theme",
  "download cv",
  "clear",
  "social",
  "history",
];

// Easter egg commands (hidden)
const EASTER_EGGS = {
  sudo: "Nice try! You don't have admin privileges in this browser.",
  matrix: <MatrixAnimation />,
  coffee:
    "Error: Coffee machine not connected. Would you like some virtual coffee instead? ☕",
  hello: "Hello there! Nice to meet you. How can I help you today?",
  ping: "pong! 🏓",
  flip: "(╯°□°）╯︵ ┻━┻",
  unflip: "┬─┬ ノ( ゜-゜ノ)",
  party: "🎉 🎊 🎈 🥳 Let's party! 🎵 🎶 💃 🕺",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
  quote: '"The best way to predict the future is to invent it." - Alan Kay',
  easter:
    "🥚 You found an Easter egg! There are several more hidden commands to discover...",
  konami:
    "⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ - Cheat code activated! Unlimited power! (not really)",
};

export default function Terminal() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef<number>(0);
  const dragStartHeightRef = useRef<number>(0);

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    terminalState,
    terminalHeight,
    setTerminalHeight,
    toggleTerminal,
    maximizeTerminal,
  } = useTerminal();

  // Konami code sequence
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Display welcome message on component mount
  useEffect(() => {
    setCommands([
      {
        input: "help",
        output: "Welcome! Type 'help' to see available commands.",
      },
    ]);
  }, []);

  // Update suggestions when input changes
  useEffect(() => {
    if (currentInput.trim()) {
      const matchedCommands = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      setSuggestions(matchedCommands);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  // Listen for Konami code
  useEffect(() => {
    const handleGlobalKeydown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);

        if (nextIndex === konamiCode.length) {
          // Konami code completed!
          handleCommand("konami");
          setKonamiIndex(0);
        }
      } else {
        // Reset if wrong key pressed
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  }, [konamiIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow keys for command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setShowSuggestions(false);
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setShowSuggestions(false);
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
    // Handle Tab key for autocompletion
    else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    // Show suggestions on Ctrl+Space
    else if (e.key === " " && e.ctrlKey) {
      e.preventDefault();
      setShowSuggestions(true);
    }
    // Hide suggestions on Escape
    else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleCommand = (cmd: string) => {
    const commandParts = cmd.toLowerCase().trim().split(" ");
    const mainCommand = commandParts[0];
    const args = commandParts.slice(1);
    let output: string | JSX.Element =
      "Command not found. Type 'help' for available commands.";

    // Add command to history
    if (cmd.trim() !== "") {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    // Hide suggestions
    setShowSuggestions(false);

    // Check for easter eggs first
    if (mainCommand in EASTER_EGGS) {
      output = EASTER_EGGS[mainCommand as keyof typeof EASTER_EGGS];
      setCommands((prev) => [...prev, { input: cmd, output }]);
      return;
    }

    // Basic commands
    switch (mainCommand) {
      case "help":
        output = (
          <div className="space-y-1">
            <p className="font-medium">Available commands:</p>
            <p>
              <span className="text-editor-accent-primary">help</span> - Display
              available commands
            </p>
            <p>
              <span className="text-editor-accent-primary">about</span> -
              Navigate to About page
            </p>
            <p>
              <span className="text-editor-accent-primary">projects</span> -
              Navigate to Projects page
            </p>
            <p>
              <span className="text-editor-accent-primary">experience</span> -
              Navigate to Experience page
            </p>
            <p>
              <span className="text-editor-accent-primary">contact</span> -
              Navigate to Contact page
            </p>
            <p>
              <span className="text-editor-accent-primary">skills</span> -
              Display skills (try 'skills frontend', 'skills backend', etc.)
            </p>
            <p>
              <span className="text-editor-accent-primary">theme</span> - Toggle
              dark/light theme
            </p>
            <p>
              <span className="text-editor-accent-primary">download cv</span> -
              Download my CV/resume
            </p>
            <p>
              <span className="text-editor-accent-primary">clear</span> - Clear
              terminal history
            </p>
            <p>
              <span className="text-editor-accent-primary">social</span> -
              Display social media links
            </p>
            <p>
              <span className="text-editor-accent-primary">history</span> -
              Display command history
            </p>
            <div className="mt-2 text-xs text-editor-text-secondary">
              <p>Tips:</p>
              <p>- Use up/down arrow keys to navigate command history</p>
              <p>- Press Tab to autocomplete commands</p>
              <p>- Press Ctrl+Space to show command suggestions</p>
              <p>- There might be some hidden easter eggs... 🥚</p>
            </div>
          </div>
        );
        break;
      case "about":
        output = "Navigating to About page...";
        navigate("/");
        break;
      case "projects":
        output = "Navigating to Projects page...";
        navigate("/projects");
        break;
      case "experience":
        output = "Navigating to Experience page...";
        navigate("/experience");
        break;
      case "contact":
        output = "Navigating to Contact page...";
        navigate("/contact");
        break;
      case "skills":
        if (args.length > 0 && args[0] in SKILLS) {
          const category = args[0] as keyof typeof SKILLS;
          output = (
            <div>
              <p className="font-medium mb-1">My {category} skills:</p>
              <ul className="list-disc pl-5">
                {SKILLS[category].map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          );
        } else {
          output = (
            <div className="space-y-2">
              <p className="font-medium">My skills by category:</p>
              <p>
                Type{" "}
                <span className="text-editor-accent-primary">
                  skills [category]
                </span>{" "}
                to see specific skills.
              </p>
              <p>Available categories:</p>
              <ul className="list-disc pl-5">
                {Object.keys(SKILLS).map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
          );
        }
        break;
      case "theme":
        toggleTheme();
        output = `Theme switched to ${theme === "dark" ? "light" : "dark"} mode.`;
        break;
      case "download":
        if (args.length > 0 && args[0] === "cv") {
          // Trigger download of CV - update with your actual CV path
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Isaac_Ayorinde_Resume.pdf";
          link.click();
          output = "Downloading CV...";
        } else {
          output = "Please specify what to download. Try 'download cv'";
        }
        break;
      case "clear":
        setCommands([]);
        return;
      case "social":
        output = (
          <div className="space-y-2">
            <p className="font-medium">Connect with me:</p>
            <p>
              <span className="text-editor-accent-primary">GitHub:</span>{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-editor-accent-primary"
              >
                github.com/yourusername
              </a>
            </p>
            <p>
              <span className="text-editor-accent-primary">LinkedIn:</span>{" "}
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-editor-accent-primary"
              >
                linkedin.com/in/yourusername
              </a>
            </p>
            <p>
              <span className="text-editor-accent-primary">Twitter:</span>{" "}
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-editor-accent-primary"
              >
                twitter.com/yourusername
              </a>
            </p>
          </div>
        );
        break;
      case "history":
        if (commandHistory.length === 0) {
          output = "No command history available.";
        } else {
          output = (
            <div>
              <p className="font-medium mb-1">Command history:</p>
              <ul className="list-disc pl-5">
                {commandHistory.map((cmd, index) => (
                  <li key={index}>{cmd}</li>
                ))}
              </ul>
            </div>
          );
        }
        break;
      case "eastereggs":
        // Easter egg that tells you there are easter eggs
        output =
          "Nice try! Find them yourself 😉 (Hint: Try common terminal commands, greetings, or gaming references)";
        break;
    }

    setCommands((prev) => [...prev, { input: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput("");
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Handle suggestion click
  const selectSuggestion = (suggestion: string) => {
    setCurrentInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle drag to resize terminal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = dragStartYRef.current - e.clientY;
      const newHeight = dragStartHeightRef.current + deltaY;
      setTerminalHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setTerminalHeight]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartHeightRef.current = terminalHeight;
  };

  // Hide content when collapsed
  const isContentVisible = terminalState !== "collapsed";

  return (
    <div
      className="flex flex-col bg-editor-bg-terminal text-sm"
      style={{ height: terminalHeight }}
    >
      {/* Terminal Header / Drag Handle */}
      <div
        className="flex items-center justify-between border-b border-editor-bg-secondary px-4 py-2 cursor-ns-resize select-none"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center space-x-2 text-editor-text-secondary">
          <div className="h-3 w-3 rounded-full bg-editor-accent-error"></div>
          <div className="h-3 w-3 rounded-full bg-editor-accent-warning"></div>
          <div className="h-3 w-3 rounded-full bg-editor-accent-success"></div>
          <span className="ml-2">Terminal</span>
        </div>

        <div className="flex items-center space-x-2">
          {terminalState === "collapsed" ? (
            <button
              onClick={toggleTerminal}
              className="text-editor-text-secondary hover:text-editor-text-primary"
              aria-label="Expand terminal"
            >
              <FaChevronUp size={14} />
            </button>
          ) : (
            <>
              <button
                onClick={toggleTerminal}
                className="text-editor-text-secondary hover:text-editor-text-primary"
                aria-label="Collapse terminal"
              >
                <FaChevronDown size={14} />
              </button>
              {terminalState === "maximized" ? (
                <button
                  onClick={maximizeTerminal}
                  className="text-editor-text-secondary hover:text-editor-text-primary"
                  aria-label="Restore terminal"
                >
                  <FaCompress size={14} />
                </button>
              ) : (
                <button
                  onClick={maximizeTerminal}
                  className="text-editor-text-secondary hover:text-editor-text-primary"
                  aria-label="Maximize terminal"
                >
                  <FaExpand size={14} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Terminal Content - Hidden when collapsed */}
      {isContentVisible && (
        <div
          className="flex h-full flex-col p-4 font-mono"
          onClick={focusInput}
        >
          <div ref={terminalRef} className="flex-1 overflow-auto pb-2">
            {commands.map((cmd, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center text-editor-accent-primary">
                  <span className="mr-2">$</span>
                  <span>{cmd.input}</span>
                </div>
                <div className="ml-4 text-editor-text-primary">
                  {cmd.output}
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-t border-editor-bg-secondary pt-2"
            >
              <span className="mr-2 text-editor-accent-primary">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => currentInput.trim() && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                className="flex-1 bg-transparent text-editor-text-primary outline-none"
                autoFocus
                aria-label="Terminal input"
              />
            </form>

            {/* Command suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full left-7 mb-1 w-64 max-h-48 overflow-y-auto rounded bg-editor-bg-secondary shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-3 py-1.5 hover:bg-editor-accent-primary/20"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
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

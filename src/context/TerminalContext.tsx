import { createContext, useContext, useState, ReactNode } from "react";

// Terminal states
export type TerminalState = "collapsed" | "normal" | "maximized";

interface TerminalContextType {
  terminalState: TerminalState;
  terminalHeight: number;
  setTerminalState: (state: TerminalState) => void;
  setTerminalHeight: (height: number) => void;
  toggleTerminal: () => void;
  maximizeTerminal: () => void;
  minimizeTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(
  undefined
);

// Default terminal height in pixels
const DEFAULT_TERMINAL_HEIGHT = 250;
const MIN_TERMINAL_HEIGHT = 36; // Just enough for the title bar
const MAX_TERMINAL_HEIGHT = 500;

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [terminalState, setTerminalState] = useState<TerminalState>("normal");
  const [terminalHeight, setTerminalHeight] = useState(DEFAULT_TERMINAL_HEIGHT);

  // Save the height before collapsing to restore it later
  const [previousHeight, setPreviousHeight] = useState(DEFAULT_TERMINAL_HEIGHT);

  const toggleTerminal = () => {
    if (terminalState === "collapsed") {
      // Restore previous height
      setTerminalHeight(previousHeight);
      setTerminalState("normal");
    } else {
      // Save current height before collapsing
      setPreviousHeight(terminalHeight);
      setTerminalHeight(MIN_TERMINAL_HEIGHT);
      setTerminalState("collapsed");
    }
  };

  const maximizeTerminal = () => {
    if (terminalState !== "maximized") {
      // Save current height before maximizing
      if (terminalState !== "collapsed") {
        setPreviousHeight(terminalHeight);
      }
      setTerminalHeight(MAX_TERMINAL_HEIGHT);
      setTerminalState("maximized");
    } else {
      // Restore to normal
      setTerminalHeight(previousHeight);
      setTerminalState("normal");
    }
  };

  const minimizeTerminal = () => {
    setTerminalState("normal");
    setTerminalHeight(DEFAULT_TERMINAL_HEIGHT);
  };

  // Safe setter for height that respects min/max bounds
  const setTerminalHeightSafe = (height: number) => {
    const newHeight = Math.min(
      Math.max(height, MIN_TERMINAL_HEIGHT),
      MAX_TERMINAL_HEIGHT
    );
    setTerminalHeight(newHeight);

    // Update state based on height
    if (newHeight <= MIN_TERMINAL_HEIGHT) {
      setTerminalState("collapsed");
    } else if (newHeight >= MAX_TERMINAL_HEIGHT) {
      setTerminalState("maximized");
    } else {
      setTerminalState("normal");
    }
  };

  return (
    <TerminalContext.Provider
      value={{
        terminalState,
        terminalHeight,
        setTerminalState,
        setTerminalHeight: setTerminalHeightSafe,
        toggleTerminal,
        maximizeTerminal,
        minimizeTerminal,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}

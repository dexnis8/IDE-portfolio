/**
 * ModeToggleButton.tsx — floating FAB shown in LANDING mode only.
 * Kiro purple accent. Hides automatically when in devMode (Layout is rendered instead).
 */

import { FiTerminal, FiHome } from "react-icons/fi";
import { useViewMode } from "../../context/ViewModeContext";

export default function ModeToggleButton() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <button
      onClick={toggleViewMode}
      aria-label={viewMode === "landing" ? "Switch to Dev Mode" : "Back to Portfolio"}
      className="group fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center
                 rounded-md border border-kiro-accent/40 bg-kiro-accent2 text-white shadow-lg
                 transition-all hover:bg-kiro-accent hover:border-kiro-accent hover:scale-105
                 dark:border-kiro-accent/40 dark:bg-kiro-accent2 dark:hover:bg-kiro-accent
                 light:border-kiro-l-accent/40 light:bg-kiro-l-accent2 light:text-white
                 light:hover:bg-kiro-l-accent"
    >
      {viewMode === "landing"
        ? <FiTerminal size={20} />
        : <FiHome     size={20} />}
    </button>
  );
}

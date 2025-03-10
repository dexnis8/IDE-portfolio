import { FaCode, FaHome } from "react-icons/fa";
import { useViewMode } from "../../context/ViewModeContext";

export default function ModeToggleButton() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <button
      onClick={toggleViewMode}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-editor-accent-primary text-white shadow-lg transition-all hover:bg-editor-accent-secondary hover:scale-110"
      aria-label={
        viewMode === "landing" ? "Switch to Developer Mode" : "Back to Home"
      }
    >
      {viewMode === "landing" ? <FaCode size={24} /> : <FaHome size={24} />}
    </button>
  );
}

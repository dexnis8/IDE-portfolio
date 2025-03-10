import { createContext, useContext, useState, useEffect } from "react";

type ViewMode = "landing" | "devMode";

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(
  undefined
);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const savedMode = localStorage.getItem("viewMode");
    // Default to "landing" if no saved preference
    return (savedMode as ViewMode) || "landing";
  });

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "landing" ? "devMode" : "landing"));
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}

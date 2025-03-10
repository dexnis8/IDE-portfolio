import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Terminal from "./Terminal";
import Tabs from "./Tabs";
import { useViewMode } from "../../context/ViewModeContext";
import { TerminalProvider } from "../../context/TerminalContext";
import { FaHome } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { setViewMode } = useViewMode();

  return (
    <TerminalProvider>
      <div className="flex h-screen flex-col bg-editor-bg-primary text-editor-text-primary">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 border-r border-editor-bg-secondary">
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <Sidebar />
              </div>

              {/* Back to Landing button at bottom of sidebar */}
              <div className="border-t border-editor-bg-secondary p-4">
                <button
                  onClick={() => setViewMode("landing")}
                  className="flex w-full items-center justify-center gap-2 rounded py-2 text-sm text-editor-text-secondary hover:bg-editor-bg-secondary hover:text-editor-text-primary"
                >
                  <FaHome /> Back to Normal Mode
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* Top Navigation Bar */}
            <div className="flex h-12 items-center border-b border-editor-bg-secondary px-4">
              <Tabs />
            </div>
            <main className="flex-1 overflow-auto p-6">{children}</main>

            {/* Terminal */}
            <Terminal />
          </div>
        </div>
      </div>
    </TerminalProvider>
  );
}

/* 
  <div className="flex h-screen flex-col bg-editor-bg-primary text-editor-text-primary">
      
        <div className="flex h-12 items-center border-b border-editor-bg-secondary px-4">
          <Tabs />
        </div>

        <div className="flex flex-1 overflow-hidden">
       
          <div className="w-64 flex-shrink-0 border-r border-editor-bg-secondary">
            <Sidebar />
          </div>

          
          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-auto p-6">{children}</main>

        
            <div className="h-48 border-t border-editor-bg-secondary bg-editor-bg-terminal">
              <Terminal />
            </div>
          </div>
        </div>
      </div>

*/

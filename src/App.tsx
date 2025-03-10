import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ViewModeProvider, useViewMode } from "./context/ViewModeContext";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import ModeToggleButton from "./components/shared/ModeToggleButton";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));

// Loading component for suspense fallback
function LoadingScreen() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-editor-text-primary">Loading...</div>
    </div>
  );
}

// App content with mode switching
function AppContent() {
  const { viewMode } = useViewMode();

  return (
    <>
      {viewMode === "landing" ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Redirect any other routes to landing page when in landing mode */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Layout>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback route for dev mode */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <ViewModeProvider>
          <AppContent />
          <ModeToggleButton />
        </ViewModeProvider>
      </ThemeProvider>
    </Router>
  );
}

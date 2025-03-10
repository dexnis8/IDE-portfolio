import { useLocation, Link } from "react-router-dom";
import { FaUser, FaCode, FaBriefcase, FaEnvelope } from "react-icons/fa";

interface Tab {
  path: string;
  label: string;
  icon: JSX.Element;
}

const tabs: Tab[] = [
  { path: "/", label: "about.tsx", icon: <FaUser /> },
  { path: "/projects", label: "projects.tsx", icon: <FaCode /> },
  { path: "/experience", label: "experience.tsx", icon: <FaBriefcase /> },
  { path: "/contact", label: "contact.tsx", icon: <FaEnvelope /> },
];

export default function Tabs() {
  const location = useLocation();

  return (
    <div className="flex h-full items-center space-x-1">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`group flex h-full items-center space-x-2 border-b-2 px-4 py-2 text-sm ${
            location.pathname === tab.path
              ? "border-b-editor-accent-primary bg-editor-bg-primary text-editor-text-primary"
              : "border-b-transparent text-editor-text-secondary hover:bg-editor-bg-secondary"
          }`}
        >
          <span className="text-xs">{tab.icon}</span>
          <span>{tab.label}</span>
          <button
            className="ml-2 hidden rounded-sm p-1 hover:bg-editor-bg-secondary group-hover:block"
            onClick={(e) => {
              e.preventDefault();
              // Add close tab functionality if needed
            }}
          >
            ×
          </button>
        </Link>
      ))}
    </div>
  );
}

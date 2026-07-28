/**
 * Tabs.tsx — Kiro IDE editor tab bar
 * Active tab has a 2px top accent border and lighter background.
 * Inactive tabs show a subtle × on hover.
 */

import { useLocation, Link } from "react-router-dom";
import { FiUser, FiCode, FiBriefcase, FiMail, FiX } from "react-icons/fi";

interface Tab {
  path: string;
  label: string;
  icon: React.ReactNode;
  /** Tailwind colour class for the icon */
  iconCls: string;
}

const tabs: Tab[] = [
  {
    path: "/",
    label: "about.tsx",
    icon: <FiUser size={12} />,
    iconCls: "text-[#80f4ff]",   /* kiro variable colour */
  },
  {
    path: "/projects",
    label: "projects.tsx",
    icon: <FiCode size={12} />,
    iconCls: "text-[#8dc8fb]",   /* kiro fn colour */
  },
  {
    path: "/experience",
    label: "experience.tsx",
    icon: <FiBriefcase size={12} />,
    iconCls: "text-[#e2d3fe]",   /* kiro keyword colour */
  },
  {
    path: "/contact",
    label: "contact.tsx",
    icon: <FiMail size={12} />,
    iconCls: "text-[#80ffb5]",   /* kiro string colour */
  },
];

export default function Tabs() {
  const location = useLocation();

  return (
    <div className="flex h-full items-stretch">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`group relative flex h-full items-center gap-1.5 border-r px-4
              font-mono text-[12px] transition-colors select-none
              ${active
                ? /* active */
                  "border-r-kiro-border bg-kiro-editor text-kiro-text " +
                  "dark:border-r-kiro-border dark:bg-kiro-editor dark:text-kiro-text " +
                  "light:border-r-kiro-l-border light:bg-kiro-l-editor light:text-kiro-l-text"
                : /* inactive */
                  "border-r-kiro-border bg-kiro-workbench text-kiro-muted " +
                  "hover:bg-kiro-surface hover:text-kiro-text " +
                  "dark:border-r-kiro-border dark:bg-kiro-workbench dark:text-kiro-muted " +
                  "dark:hover:bg-kiro-surface dark:hover:text-kiro-text " +
                  "light:border-r-kiro-l-border light:bg-kiro-l-workbench light:text-kiro-l-muted " +
                  "light:hover:bg-kiro-l-surface light:hover:text-kiro-l-text"
              }`}
          >
            {/* Top accent bar on active tab */}
            {active && (
              <span
                className="absolute inset-x-0 top-0 h-[2px] rounded-b-none
                           bg-kiro-accent dark:bg-kiro-accent light:bg-kiro-l-accent"
              />
            )}

            {/* Icon */}
            <span className={tab.iconCls}>{tab.icon}</span>

            {/* Label */}
            <span>{tab.label}</span>

            {/* Close button — visible on hover, always on active */}
            <span
              className={`ml-1 rounded p-0.5 transition-colors
                ${active
                  ? "text-kiro-muted hover:bg-kiro-elevated hover:text-kiro-text dark:text-kiro-muted dark:hover:bg-kiro-elevated dark:hover:text-kiro-text light:text-kiro-l-muted light:hover:bg-kiro-l-elevated light:hover:text-kiro-l-text"
                  : "invisible text-kiro-muted group-hover:visible hover:bg-kiro-elevated dark:text-kiro-muted dark:hover:bg-kiro-elevated light:text-kiro-l-muted light:hover:bg-kiro-l-elevated"
                }`}
              onClick={(e) => e.preventDefault()} /* tab close is UI-only */
            >
              <FiX size={11} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

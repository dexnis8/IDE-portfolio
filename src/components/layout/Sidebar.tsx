import { Link, useLocation } from "react-router-dom";
import { FaUser, FaCode, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  {
    path: "/",
    label: "about.tsx",
    icon: <FaUser className="text-editor-syntax-variable" />,
  },
  {
    path: "/projects",
    label: "projects.tsx",
    icon: <FaCode className="text-editor-syntax-function" />,
  },
  {
    path: "/experience",
    label: "experience.tsx",
    icon: <FaBriefcase className="text-editor-syntax-keyword" />,
  },
  {
    path: "/contact",
    label: "contact.tsx",
    icon: <FaEnvelope className="text-editor-syntax-string" />,
  },
];

const socialLinks = [
  {
    href: "https://github.com/dexnis8",
    icon: <IoLogoGithub />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/isaac-ayorinde",
    icon: <IoLogoLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/dexnis8",
    icon: <RiTwitterXFill />,
    label: "X (Twitter)",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col bg-editor-bg-secondary p-4">
      {/* Profile Section */}
      <div className="mb-8 text-center">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
          <img
            src="/isaac.jpg"
            alt="Profile"
            className="h-full w-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.src = `https://ui-avatars.com/api/?name=Isaac+Ayorinde&background=007ACC&color=fff&size=200`;
            }}
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Isaac Ayorinde</h2>
        <p className="text-sm text-editor-text-secondary">
          Full Stack Developer & Blockchain Researcher
        </p>
      </div>

      {/* Navigation */}
      <nav className="mb-6">
        <h3 className="mb-2 text-xs uppercase text-editor-text-secondary">
          Explorer
        </h3>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 rounded px-3 py-2 text-sm ${
                  location.pathname === item.path
                    ? "bg-editor-accent-primary/10 text-editor-accent-primary"
                    : "text-editor-text-primary hover:bg-editor-bg-primary"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="mt-auto mb-2">
        <h3 className="mb-4 text-xs uppercase border pb-1 border-x-0 border-t-0 text-editor-text-secondary">
          Connect
        </h3>
        <div className="flex justify-center space-x-4 ">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-editor-text-secondary hover:text-editor-accent-primary"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

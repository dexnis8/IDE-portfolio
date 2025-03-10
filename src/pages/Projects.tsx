import { Editor } from "@monaco-editor/react";

const projectsCode = `interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    name: "Project One",
    description: \`
      A full-stack web application that helps developers showcase
      their work in a unique code editor interface. Features include
      dark mode, terminal commands, and interactive code displays.
    \`,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    github: "https://github.com/yourusername/project-one",
    demo: "https://project-one.demo.com",
  },
  {
    name: "Project Two",
    description: \`
      Real-time collaboration platform for developers. Includes
      features like live code sharing, video chat, and integrated
      development environment.
    \`,
    technologies: ["Next.js", "Socket.IO", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/project-two",
  },
  {
    name: "Project Three",
    description: \`
      AI-powered code review assistant that helps developers
      identify potential bugs and suggest improvements in their
      code. Uses machine learning to provide contextual feedback.
    \`,
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    github: "https://github.com/yourusername/project-three",
    demo: "https://project-three.demo.com",
  },
];

function displayProjects(): string {
  return projects
    .map(
      (project) => \`
  🚀 \${project.name}
  ----------------------
  \${project.description.trim()}
  
  🛠️ Technologies:
  \${project.technologies.map((tech) => \`  - \${tech}\`).join('\\n')}
  
  🔗 Links:
  \${project.github ? \`  - GitHub: \${project.github}\` : ''}
  \${project.demo ? \`  - Demo: \${project.demo}\` : ''}
  \`
    )
    .join('\\n\\n');
}

// Display all projects
console.log(displayProjects());
`;

export default function Projects() {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={projectsCode}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          fontFamily: "Fira Code, monospace",
        }}
      />
    </div>
  );
}

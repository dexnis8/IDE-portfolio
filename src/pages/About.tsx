import { Editor } from "@monaco-editor/react";
import { TypeAnimation } from "react-type-animation";

const aboutCode = `interface Developer {
  name: string;
  title: string;
  location: string;
  skills: string[];
  interests: string[];
}

const developer: Developer = {
  name: "Isaac Ayorinde",
  title: "Full Stack Developer & Blockchain Researcher",
  location: "Lagos, Nigeria",
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Solidity",
    "Docker",
    "AWS",
  ],
  interests: [
    "Open Source",
    "Web Development",
    "Blockchain Development",
    "Cloud Architecture",
    "DevOps",
  ],
};

function getAboutMe(): string {
  return \`
    Hi there! 👋 I'm \${developer.name}, a passionate \${developer.title}
    based in \${developer.location}. I love building things with code
    and solving complex problems.
    
    My expertise includes:
    - \${developer.skills.join('\\n    - ')}
    
    When I'm not coding, I enjoy exploring:
    - \${developer.interests.join('\\n    - ')}
    
    Let's build something amazing together!
  \`;
}

// Call getAboutMe() to see my story
console.log(getAboutMe());
`;

export default function About() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <TypeAnimation
          sequence={["Welcome to my portfolio!", 1000]}
          className="text-xl font-semibold text-editor-text-primary"
          cursor={true}
          repeat={0}
        />
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={aboutCode}
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
    </div>
  );
}

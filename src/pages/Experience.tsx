import { Editor } from "@monaco-editor/react";

const experienceCode = `interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  achievements: string[];
}

class Career {
  private workExperience: Experience[] = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company One",
      location: "City, Country",
      period: "2022 - Present",
      responsibilities: [
        "Led development of microservices architecture",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines and DevOps practices",
        "Reduced application load time by 40%",
      ],
      technologies: [
        "React", "Node.js", "TypeScript",
        "AWS", "Docker", "MongoDB",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Tech Company Two",
      location: "City, Country",
      period: "2020 - 2022",
      responsibilities: [
        "Developed and maintained multiple web applications",
        "Collaborated with UX team for optimal user experience",
        "Integrated third-party APIs and services",
        "Improved test coverage to 90%",
      ],
      technologies: [
        "Vue.js", "Python", "Django",
        "PostgreSQL", "Redis", "GCP",
      ],
    },
  ];

  private education: Education[] = [
    {
      degree: "Master of Computer Science",
      school: "University Name",
      location: "City, Country",
      period: "2018 - 2020",
      achievements: [
        "Graduated with Distinction",
        "Specialized in Machine Learning",
        "Published research paper on AI",
      ],
    },
    {
      degree: "Bachelor of Computer Science",
      school: "University Name",
      location: "City, Country",
      period: "2014 - 2018",
      achievements: [
        "First Class Honours",
        "Dean's List all semesters",
        "Led Programming Club",
      ],
    },
  ];

  public displayCareerHistory(): string {
    return \`
    💼 Work Experience
    ================
    \${this.workExperience.map(job => \`
    \${job.title} @ \${job.company}
    \${job.location} | \${job.period}
    
    Key Responsibilities:
    \${job.responsibilities.map(r => \`• \${r}\`).join('\\n')}
    
    Technologies:
    \${job.technologies.map(t => \`• \${t}\`).join('\\n')}
    \`).join('\\n\\n')}

    📚 Education
    ==========
    \${this.education.map(edu => \`
    \${edu.degree}
    \${edu.school} | \${edu.location}
    \${edu.period}
    
    Achievements:
    \${edu.achievements.map(a => \`• \${a}\`).join('\\n')}
    \`).join('\\n\\n')}
    \`;
  }
}

// Display career history
const career = new Career();
console.log(career.displayCareerHistory());
`;

export default function Experience() {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue={experienceCode}
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

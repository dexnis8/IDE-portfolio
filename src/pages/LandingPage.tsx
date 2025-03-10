import { useRef, useState } from "react";
import { useViewMode } from "../context/ViewModeContext";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function LandingPage() {
  const { setViewMode } = useViewMode();
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset form status after 3 seconds
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      setFormStatus("error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 -z-10"
        >
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900"></div>

          {/* Animated grid background */}
          <div className="grid h-full w-full grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                className="flex items-center justify-center border border-gray-200 text-xs text-gray-400 dark:border-gray-800"
              >
                {i % 15 === 0 && (
                  <span className="font-mono opacity-50">{`{code: ${i}}`}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 max-w-4xl"
        >
          <motion.div
            className="mb-6 mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-editor-accent-primary shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <img
              src="/avatar.jpg" // Add your profile picture to public folder
              alt="Isaac Ayorinde"
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.src = `https://ui-avatars.com/api/?name=Isaac+Ayorinde&background=007ACC&color=fff&size=200`;
              }}
            />
          </motion.div>

          <motion.h1
            className="mb-4 text-3xl font-bold md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-editor-accent-primary">Hello, I'm </span>
            <TypeAnimation
              sequence={[
                "Isaac Ayorinde",
                1000,
                "a Full Stack Developer",
                1000,
                "a Blockchain Researcher",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Passionate about creating innovative web solutions and exploring
            blockchain technology. Building digital experiences that make a
            difference.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.button
              onClick={() => setViewMode("devMode")}
              className="flex items-center gap-2 rounded-lg bg-editor-accent-primary px-6 py-3 text-white transition-all hover:bg-editor-accent-secondary hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCode /> Switch to Dev Mode
            </motion.button>
            <motion.button
              onClick={scrollToAbout}
              className="flex items-center gap-2 rounded-lg border-2 border-editor-accent-primary px-6 py-3 text-editor-accent-primary transition-all hover:bg-editor-accent-primary hover:text-white hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-all hover:bg-editor-accent-primary"
              whileHover={{ y: -5 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-all hover:bg-editor-accent-primary"
              whileHover={{ y: -5 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-all hover:bg-editor-accent-primary"
              whileHover={{ y: -5 }}
            >
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <button
            onClick={scrollToAbout}
            className="text-editor-accent-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">About Me</h2>
            <div className="mx-auto h-1 w-20 bg-editor-accent-primary"></div>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-6 text-2xl font-semibold">My Journey</h3>
              <p className="mb-4 text-lg">
                I'm Isaac Ayorinde, a passionate Full Stack Developer and
                Blockchain Researcher with over 5 years of experience in
                creating innovative digital solutions.
              </p>
              <p className="mb-8 text-lg">
                My journey in technology began with a fascination for how
                digital products are built. This curiosity led me to explore
                various technologies and frameworks, ultimately specializing in
                modern web development and blockchain applications.
              </p>

              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-editor-accent-primary px-6 py-3 text-white transition-all hover:bg-editor-accent-secondary hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download Resume
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="mb-6 text-2xl font-semibold">My Skills</h3>

              {[
                { name: "Frontend Development", value: 90 },
                { name: "Backend Development", value: 85 },
                { name: "Database Management", value: 80 },
                { name: "DevOps & Deployment", value: 75 },
                { name: "Blockchain Technology", value: 70 },
              ].map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full bg-editor-accent-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="bg-gray-50 px-4 py-24 dark:bg-gray-800"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">My Projects</h2>
            <div className="mx-auto h-1 w-20 bg-editor-accent-primary"></div>
            <p className="mx-auto mt-8 max-w-3xl text-lg">
              Check out some of my recent work. For more technical details,
              switch to Dev Mode.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Code Editor Portfolio",
                description:
                  "A developer portfolio with VS Code-inspired interface and interactive terminal.",
                tags: ["React", "TypeScript", "Tailwind CSS"],
                image:
                  "https://via.placeholder.com/600x340/007ACC/FFFFFF?text=Code+Editor+Portfolio",
              },
              {
                title: "Blockchain Explorer",
                description:
                  "A web application for tracking and analyzing blockchain transactions.",
                tags: ["Next.js", "Ethereum", "Web3.js"],
                image:
                  "https://via.placeholder.com/600x340/4EC9B0/FFFFFF?text=Blockchain+Explorer",
              },
              {
                title: "AI-Powered Task Manager",
                description:
                  "Task management app with AI-based prioritization and suggestions.",
                tags: ["React", "Node.js", "Machine Learning"],
                image:
                  "https://via.placeholder.com/600x340/CE9178/FFFFFF?text=AI+Task+Manager",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-700"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-editor-accent-primary/10 px-3 py-1 text-xs font-medium text-editor-accent-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("devMode")}
                      className="text-sm font-medium text-editor-accent-primary hover:underline"
                    >
                      View Details
                    </motion.button>
                    <motion.a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-sm font-medium text-editor-accent-primary hover:underline"
                    >
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => setViewMode("devMode")}
              className="inline-flex items-center gap-2 rounded-lg bg-editor-accent-primary px-6 py-3 text-white transition-all hover:bg-editor-accent-secondary hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCode /> View All Projects in Dev Mode
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Get In Touch
            </h2>
            <div className="mx-auto h-1 w-20 bg-editor-accent-primary"></div>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-6 text-2xl font-semibold">
                Contact Information
              </h3>

              <div className="mb-8 space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-editor-accent-primary/10 text-editor-accent-primary">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </h4>
                    <a
                      href="mailto:isaac@example.com"
                      className="text-lg hover:text-editor-accent-primary hover:underline"
                    >
                      isaac@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-editor-accent-primary/10 text-editor-accent-primary">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </h4>
                    <p className="text-lg">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <h3 className="mb-6 text-2xl font-semibold">Connect With Me</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-editor-accent-primary"
                  whileHover={{ y: -5 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0077B5] text-white hover:bg-editor-accent-primary"
                  whileHover={{ y: -5 }}
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:bg-editor-accent-primary"
                  whileHover={{ y: -5 }}
                >
                  <FaTwitter />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mb-6 text-2xl font-semibold">Send Me a Message</h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-editor-accent-primary focus:outline-none focus:ring-2 focus:ring-editor-accent-primary/50 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-editor-accent-primary focus:outline-none focus:ring-2 focus:ring-editor-accent-primary/50 dark:border-gray-600 dark:bg-gray-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-editor-accent-primary focus:outline-none focus:ring-2 focus:ring-editor-accent-primary/50 dark:border-gray-600 dark:bg-gray-700"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full rounded-lg bg-editor-accent-primary px-6 py-3 font-medium text-white transition-all hover:bg-editor-accent-secondary disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === "submitting"
                    ? "Sending..."
                    : formStatus === "success"
                      ? "Message Sent!"
                      : "Send Message"}
                </motion.button>

                {formStatus === "error" && (
                  <p className="text-sm text-red-500">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-center text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-12 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-lg font-bold">Isaac Ayorinde</h3>
              <p className="text-sm text-gray-400">
                Full Stack Developer & Blockchain Researcher
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase text-gray-400">
                Quick Links
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="transition-colors hover:text-editor-accent-primary"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="transition-colors hover:text-editor-accent-primary"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="transition-colors hover:text-editor-accent-primary"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase text-gray-400">
                Connect
              </h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-editor-accent-primary"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-editor-accent-primary"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-editor-accent-primary"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="mb-4">
              &copy; {new Date().getFullYear()} Isaac Ayorinde. All rights
              reserved.
            </p>
            <motion.button
              onClick={() => setViewMode("devMode")}
              className="inline-flex items-center gap-2 rounded-lg border border-editor-accent-primary px-4 py-2 text-sm text-editor-accent-primary transition-colors hover:bg-editor-accent-primary hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCode /> Switch to Developer Mode
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}

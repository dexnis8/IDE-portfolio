import { Editor } from "@monaco-editor/react";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const initialCode = `interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const formData: ContactForm = {
  name: "",
  email: "",
  message: "",
};

async function submitForm(data: ContactForm): Promise<void> {
  try {
    // Simulating API call
    console.log("Sending message...");
    console.log(data);
    
    // In a real app, you would send this to your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Message sent successfully!");
    return Promise.resolve();
  } catch (error) {
    console.error("Failed to send message:", error);
    return Promise.reject(error);
  }
}

// Call submitForm() with your message
submitForm(formData);`;

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [code, setCode] = useState(initialCode);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const updatedCode = initialCode.replace(
      "formData: ContactForm = {",
      `formData: ContactForm = {
  name: "${formData.name}",
  email: "${formData.email}",
  message: "${formData.message}",`
    );

    setCode(updatedCode);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("sent");

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setCode(initialCode);
      }, 3000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="grid h-full grid-cols-2 gap-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-editor-text-primary">
          Contact Me
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-editor-text-secondary"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 block w-full rounded border border-editor-bg-secondary bg-editor-bg-terminal px-3 py-2 text-editor-text-primary focus:border-editor-accent-primary focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-editor-text-secondary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1 block w-full rounded border border-editor-bg-secondary bg-editor-bg-terminal px-3 py-2 text-editor-text-primary focus:border-editor-accent-primary focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="message"
              className="block text-sm text-editor-text-secondary"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="mt-1 block h-full w-full resize-none rounded border border-editor-bg-secondary bg-editor-bg-terminal px-3 py-2 text-editor-text-primary focus:border-editor-accent-primary focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded bg-editor-accent-primary px-4 py-2 font-semibold text-white hover:bg-editor-accent-secondary disabled:opacity-50"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Sent!"
                : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-sm text-editor-accent-error">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
      <div className="h-full">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={code}
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

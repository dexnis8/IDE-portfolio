/**
 * Contact.tsx — split view: form on the left, live Monaco preview on the right.
 * Kiro IDE palette applied to all form elements.
 */

import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface ContactForm {
  name:    string;
  email:   string;
  message: string;
}

const baseCode = (f: ContactForm) => `/**
 * contact.ts — Send Isaac a message
 */

interface Message {
  from:    string;
  email:   string;
  body:    string;
  sentAt:  Date;
}

const message: Message = {
  from:   "${f.name  || "<your name>"}",
  email:  "${f.email || "<your email>"}",
  body:   "${f.message ? f.message.replace(/\n/g, "\\n") : "<your message>"}",
  sentAt: new Date(),
};

async function dispatch(msg: Message): Promise<void> {
  console.log(\`[📨] Sending message from \${msg.from}…\`);
  // POST /api/contact
  const response = await fetch("/api/contact", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(msg),
  });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  console.log("[✓] Message dispatched successfully.");
}

dispatch(message).catch(console.error);
`;

export default function Contact() {
  const { theme } = useTheme();

  const [form, setForm]     = useState<ContactForm>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((res) => setTimeout(res, 1400));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  };

  /* shared input classes */
  const inputCls =
    "mt-1 block w-full rounded border bg-kiro-elevated px-3 py-2 font-mono text-sm " +
    "text-kiro-text placeholder-kiro-muted outline-none transition-colors " +
    "border-kiro-border focus:border-kiro-accent " +
    "dark:bg-kiro-elevated dark:border-kiro-border dark:text-kiro-text dark:placeholder-kiro-muted dark:focus:border-kiro-accent " +
    "light:bg-kiro-l-elevated light:border-kiro-l-border light:text-kiro-l-text light:placeholder-kiro-l-muted light:focus:border-kiro-l-accent";

  const labelCls =
    "block font-sans text-xs font-medium text-kiro-muted " +
    "dark:text-kiro-muted light:text-kiro-l-muted";

  return (
    <div className="grid h-full grid-cols-2 gap-0">

      {/* ── Form panel ──────────────────────────────────────────────── */}
      <div className="flex flex-col overflow-y-auto border-r border-kiro-border
                      bg-kiro-editor p-8
                      dark:border-kiro-border dark:bg-kiro-editor
                      light:border-kiro-l-border light:bg-kiro-l-editor">

        {/* Header */}
        <div className="mb-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-kiro-accent
                        dark:text-kiro-accent light:text-kiro-l-accent">
            contact.tsx
          </p>
          <h2 className="mt-1 font-sans text-xl font-semibold text-kiro-text
                         dark:text-kiro-text light:text-kiro-l-text">
            Get in touch
          </h2>
          <p className="mt-1.5 font-sans text-sm text-kiro-muted
                        dark:text-kiro-muted light:text-kiro-l-muted">
            Fill in the form — the Monaco editor on the right updates live.
          </p>
        </div>

        {/* Contact meta */}
        <div className="mb-6 space-y-1.5">
          {[
            ["Email",    "isaacayorinde442@gmail.com"],
            ["Location", "Lagos, Nigeria"],
            ["Status",   "Open to new opportunities"],
          ].map(([k, v]) => (
            <p key={k} className="font-mono text-xs text-kiro-muted
                                  dark:text-kiro-muted light:text-kiro-l-muted">
              <span className="text-kiro-accent dark:text-kiro-accent light:text-kiro-l-accent">
                {k}:
              </span>
              {" "}{v}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="mb-6 border-t border-kiro-border dark:border-kiro-border light:border-kiro-l-border" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          <div>
            <label htmlFor="name" className={labelCls}>Name</label>
            <input
              id="name" name="name" type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              required
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>Email</label>
            <input
              id="email" name="email" type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ada@lovelace.dev"
              required
              className={inputCls}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <label htmlFor="message" className={labelCls}>Message</label>
            <textarea
              id="message" name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="I'd love to discuss..."
              required
              className={`${inputCls} flex-1 resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="flex items-center justify-center gap-2 rounded border border-kiro-accent
                       bg-kiro-accent px-4 py-2.5 font-mono text-sm font-semibold text-white
                       transition-opacity hover:opacity-90 disabled:opacity-60
                       dark:border-kiro-accent dark:bg-kiro-accent
                       light:border-kiro-l-accent light:bg-kiro-l-accent"
          >
            {status === "sending" ? "Dispatching…" :
             status === "sent"    ? "✓ Message sent!" :
             "dispatch(message)"}
          </button>

          {status === "error" && (
            <p className="font-mono text-xs text-kiro-error dark:text-kiro-error light:text-kiro-l-error">
              // Error: failed to send. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* ── Monaco preview ───────────────────────────────────────────── */}
      <div className="h-full">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={baseCode(form)}
          theme={theme === "dark" ? "vs-dark" : "vs"}
          options={{
            readOnly:             true,
            minimap:              { enabled: false },
            fontSize:             13,
            lineHeight:           22,
            lineNumbers:          "on",
            scrollBeyondLastLine: false,
            wordWrap:             "on",
            automaticLayout:      true,
            fontFamily:           "'Fira Code', 'JetBrains Mono', monospace",
            fontLigatures:        true,
            renderLineHighlight:  "gutter",
            padding:              { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}

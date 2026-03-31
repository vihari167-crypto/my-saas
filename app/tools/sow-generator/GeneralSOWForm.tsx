"use client";

import { useEffect, useRef, useState } from "react";

type FormData = {
  projectName: string;
  clientName: string;
  industry: string;
  keyDeliverables: string;
  timelineWeeks: string;
  revisionRounds: string;
  yourName: string;
  yourEmail: string;
};

const initialForm: FormData = {
  projectName: "",
  clientName: "",
  industry: "",
  keyDeliverables: "",
  timelineWeeks: "",
  revisionRounds: "",
  yourName: "",
  yourEmail: "",
};

type Section = { heading: string; lines: string[] };

function parseSections(text: string): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of text.split("\n")) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function linesToHTML(lines: string[]): string {
  const parts: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      parts.push(
        `<ul>${listItems.map((i) => `<li>${i}</li>`).join("")}</ul>`
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      if (line.trim()) parts.push(`<p>${line}</p>`);
    }
  }
  flushList();
  return parts.join("");
}

export default function GeneralSOWForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [copied, setCopied] = useState(false);

  // One ref per section's content div
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Populate contenteditable divs whenever sections change
  useEffect(() => {
    sections.forEach((section, i) => {
      const el = contentRefs.current[i];
      if (el) el.innerHTML = linesToHTML(section.lines);
    });
  }, [sections]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSections([]);
    setLoading(true);
    try {
      const res = await fetch("/api/generate-sow-general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setSections(parseSections(json.document));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getDocumentText = () => {
    return sections
      .map((section, i) => {
        const contentEl = contentRefs.current[i];
        const content = contentEl?.innerText?.trim() ?? "";
        return `${section.heading.toUpperCase()}\n\n${content}`;
      })
      .join("\n\n---\n\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getDocumentText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const sectionsHTML = sections
      .map((section, i) => {
        const contentEl = contentRefs.current[i];
        const html = contentEl?.innerHTML ?? "";
        return `<h2>${section.heading}</h2>${html}`;
      })
      .join("");

    const printHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${form.projectName || "Project"} — Scope of Work</title>
<style>
  body{font-family:Inter,Arial,sans-serif;max-width:760px;margin:40px auto;padding:24px;color:#0F172A;font-size:14px;line-height:1.7}
  h1{font-size:22px;font-weight:700;margin-bottom:4px}
  h2{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#0F172A;margin-top:28px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #E2E8F0}
  p{margin:3px 0 6px;color:#374151}
  ul{margin:4px 0 10px;padding-left:20px}
  li{margin:2px 0;color:#374151}
  hr{border:none;border-top:1px solid #E2E8F0;margin:12px 0}
  @media print{body{margin:20px}}
</style></head><body>
<h1>${form.projectName || "Project"} — Scope of Work</h1>
<hr/>
${sectionsHTML}
</body></html>`;

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(printHTML);
    win.document.close();
    win.focus();
    win.print();
  };

  const inputClass =
    "w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow";
  const labelClass = "block text-sm font-medium text-[#0F172A] mb-1.5";

  return (
    <>
      {/* Form */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="projectName">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                id="projectName"
                name="projectName"
                type="text"
                required
                placeholder="e.g. Smith Kitchen Renovation"
                value={form.projectName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="clientName">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                required
                placeholder="e.g. John Smith"
                value={form.clientName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="industry">
              Industry or Type of Work
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              placeholder="e.g. Plumbing, Photography, Graphic Design, Consulting"
              value={form.industry}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="keyDeliverables">
              Key Deliverables
            </label>
            <textarea
              id="keyDeliverables"
              name="keyDeliverables"
              rows={3}
              placeholder="e.g. Install new kitchen sink, replace pipes, test water pressure"
              value={form.keyDeliverables}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="timelineWeeks">
                Project Timeline (weeks)
              </label>
              <input
                id="timelineWeeks"
                name="timelineWeeks"
                type="number"
                min="1"
                placeholder="e.g. 2"
                value={form.timelineWeeks}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="revisionRounds">
                Number of Revision Rounds
              </label>
              <input
                id="revisionRounds"
                name="revisionRounds"
                type="number"
                min="0"
                placeholder="e.g. 1"
                value={form.revisionRounds}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="yourName">
                Your Name / Company <span className="text-red-500">*</span>
              </label>
              <input
                id="yourName"
                name="yourName"
                type="text"
                required
                placeholder="e.g. Reliable Plumbing Co."
                value={form.yourName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="yourEmail">
                Your Email
              </label>
              <input
                id="yourEmail"
                name="yourEmail"
                type="email"
                placeholder="e.g. hello@reliableplumbing.com"
                value={form.yourEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate Scope of Work"}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#2563EB] rounded-full animate-spin" />
          <p className="text-[#64748B] text-sm">
            Claude AI is writing your scope of work…
          </p>
        </div>
      )}

      {/* Editable Document Output */}
      {sections.length > 0 && !loading && (
        <>
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div>
                <span className="text-sm font-medium text-[#0F172A]">
                  {form.projectName || "Scope of Work"} — Editable Document
                </span>
                <span className="ml-2 text-xs text-[#10B981] font-medium">
                  ✓ Click any section to edit
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="text-sm text-[#2563EB] font-medium hover:underline"
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="bg-[#0F172A] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#1e293b] transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Document body — editable sections */}
            <div className="px-8 py-8 max-w-3xl">
              {/* Document title */}
              <div className="mb-6 pb-4 border-b border-[#E2E8F0]">
                <p className="text-xs text-[#94A3B8] uppercase tracking-widest mb-1">
                  Scope of Work
                </p>
                <p className="text-lg font-bold text-[#0F172A]">
                  {form.projectName || "Project"}
                </p>
                {form.clientName && (
                  <p className="text-sm text-[#64748B] mt-0.5">
                    Prepared for {form.clientName}
                  </p>
                )}
              </div>

              {sections.map((section, i) => (
                <div key={i} className="mb-6">
                  {/* Non-editable section heading */}
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-2 pb-1.5 border-b border-[#E2E8F0]">
                    {section.heading}
                  </div>
                  {/* Editable section content */}
                  <div
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm text-[#374151] leading-relaxed focus:outline-none focus:bg-[#F8FAFC] rounded px-1 -mx-1 transition-colors [&_p]:mb-2 [&_ul]:pl-5 [&_ul]:my-2 [&_li]:mb-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pro CTA */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#0F172A] font-semibold text-base">
                Want to save this and send it to your client for approval?
              </p>
              <p className="text-[#64748B] text-sm mt-1">
                Try ScopeKit Pro free for 14 days — save documents, share
                proposal links, track invoices.
              </p>
            </div>
            <a
              href="/signup"
              className="flex-shrink-0 bg-[#2563EB] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap"
            >
              Start Free Trial
            </a>
          </div>
        </>
      )}
    </>
  );
}

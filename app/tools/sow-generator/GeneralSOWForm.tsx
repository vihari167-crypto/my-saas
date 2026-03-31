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

function boldify(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*/g, "");
}

function linesToHTML(lines: string[]): string {
  const parts: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      const items = listItems
        .map(
          (item) =>
            `<div style="display:flex;gap:8px;align-items:flex-start;margin:4px 0;font-size:14px;line-height:1.8;color:#374151">` +
            `<span style="color:#2563EB;font-weight:700;flex-shrink:0">✓</span>` +
            `<span>${boldify(item)}</span></div>`
        )
        .join("");
      parts.push(`<div style="margin:4px 0 12px">${items}</div>`);
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
      if (line.trim())
        parts.push(
          `<p style="margin:3px 0 8px;color:#374151;font-size:14px;line-height:1.8">${boldify(line)}</p>`
        );
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
      .join("")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*/g, "");

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
    const printHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${form.projectName || "Project"} — Scope of Work</title>
<style>
  body{font-family:Inter,Arial,sans-serif;max-width:760px;margin:40px auto;padding:24px;color:#0F172A;font-size:14px;line-height:1.8}
  .doc-header{border-top:3px solid #2563EB;padding-top:16px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #E2E8F0}
  .doc-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#94A3B8;margin-bottom:4px}
  .doc-title{font-size:22px;font-weight:700;color:#0F172A;margin-bottom:4px}
  .doc-meta{font-size:12px;color:#64748B;margin-bottom:2px}
  h2{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#0F172A;margin-top:28px;margin-bottom:10px;padding:8px 0 8px 10px;border-left:3px solid #2563EB;border-bottom:1px solid #E2E8F0}
  @media print{body{margin:20px}}
</style></head><body>
<div class="doc-header">
  <div class="doc-label">Scope of Work</div>
  <div class="doc-title">${form.projectName || "Project"}</div>
  ${form.clientName ? `<div class="doc-meta">Prepared for ${form.clientName}</div>` : ""}
  <div class="doc-meta">${date}</div>
</div>
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
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden" style={{ borderTop: "3px solid #2563EB" }}>
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
              <div className="mb-8 pb-5 border-b border-[#E2E8F0]">
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Scope of Work
                </p>
                <p className="text-xl font-bold text-[#0F172A]">
                  {form.projectName || "Project"}
                </p>
                {form.clientName && (
                  <p className="text-sm text-[#64748B] mt-1">
                    Prepared for {form.clientName}
                  </p>
                )}
                <p className="text-xs text-[#94A3B8] mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>

              {sections.map((section, i) => (
                <div key={i} className="mb-6">
                  {/* Non-editable section heading */}
                  <div
                    className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-3 pb-2 pl-3 border-b border-[#E2E8F0]"
                    style={{ borderLeft: "3px solid #2563EB" }}
                  >
                    {section.heading}
                  </div>
                  {/* Editable section content */}
                  <div
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    className="text-sm text-[#374151] focus:outline-none focus:bg-[#F8FAFC] rounded px-1 -mx-1 transition-colors"
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

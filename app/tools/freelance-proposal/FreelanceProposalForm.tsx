"use client";

import { useEffect, useRef, useState } from "react";

type FormData = {
  yourName: string;
  yourEmail: string;
  clientName: string;
  clientCompany: string;
  projectTitle: string;
  typeOfWork: string;
  projectDescription: string;
  proposedSolution: string;
  timelineWeeks: string;
  totalPrice: string;
  revisionRounds: string;
};

const initialForm: FormData = {
  yourName: "",
  yourEmail: "",
  clientName: "",
  clientCompany: "",
  projectTitle: "",
  typeOfWork: "",
  projectDescription: "",
  proposedSolution: "",
  timelineWeeks: "",
  totalPrice: "",
  revisionRounds: "",
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
      parts.push(
        `<p style="margin:3px 0 8px;color:#374151;font-size:14px;line-height:1.8">${boldify(line)}</p>`
      );
    }
  }
  flushList();
  return parts.join("");
}

export default function FreelanceProposalForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [copied, setCopied] = useState(false);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      const res = await fetch("/api/generate-proposal", {
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

  const getDocumentText = () =>
    sections
      .map((section, i) => {
        const content = contentRefs.current[i]?.innerText?.trim() ?? "";
        return `${section.heading.toUpperCase()}\n\n${content}`;
      })
      .join("\n\n---\n\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getDocumentText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const sectionsHTML = sections
      .map((section, i) => {
        const html = contentRefs.current[i]?.innerHTML ?? "";
        return `<h2>${section.heading}</h2>${html}`;
      })
      .join("")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*/g, "");

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${form.projectTitle || "Proposal"} — ${form.clientName}</title>
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
  <div class="doc-label">Project Proposal</div>
  <div class="doc-title">${form.projectTitle || "Project Proposal"}</div>
  ${form.clientName ? `<div class="doc-meta">Prepared for ${form.clientName}${form.clientCompany ? ` · ${form.clientCompany}` : ""}</div>` : ""}
  ${form.yourName ? `<div class="doc-meta">From ${form.yourName}${form.yourEmail ? ` · ${form.yourEmail}` : ""}</div>` : ""}
  <div class="doc-meta">${date}</div>
</div>
${sectionsHTML}
</body></html>`);
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
          {/* Your details */}
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
              Your Details
            </p>
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
                  placeholder="e.g. Jane Smith Design"
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
                  placeholder="e.g. jane@janesmith.com"
                  value={form.yourEmail}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Client details */}
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
              Client Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} htmlFor="clientName">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  required
                  placeholder="e.g. Sarah Johnson"
                  value={form.clientName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="clientCompany">
                  Client Company
                </label>
                <input
                  id="clientCompany"
                  name="clientCompany"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={form.clientCompany}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Project details */}
          <div>
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4">
              Project Details
            </p>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="projectTitle">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="projectTitle"
                    name="projectTitle"
                    type="text"
                    required
                    placeholder="e.g. Brand Identity Package"
                    value={form.projectTitle}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="typeOfWork">
                    Type of Work
                  </label>
                  <input
                    id="typeOfWork"
                    name="typeOfWork"
                    type="text"
                    placeholder="e.g. Logo Design, Web Development, Photography"
                    value={form.typeOfWork}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="projectDescription">
                  What Does the Client Need?
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={3}
                  placeholder="e.g. A new brand identity for their startup including logo, color palette, and brand guidelines"
                  value={form.projectDescription}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="proposedSolution">
                  Your Proposed Solution
                </label>
                <textarea
                  id="proposedSolution"
                  name="proposedSolution"
                  rows={3}
                  placeholder="e.g. I'll create 3 initial logo concepts, refine the chosen direction, and deliver a full brand guidelines document"
                  value={form.proposedSolution}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass} htmlFor="timelineWeeks">
                    Timeline (weeks)
                  </label>
                  <input
                    id="timelineWeeks"
                    name="timelineWeeks"
                    type="number"
                    min="1"
                    placeholder="e.g. 3"
                    value={form.timelineWeeks}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="totalPrice">
                    Total Price (USD)
                  </label>
                  <input
                    id="totalPrice"
                    name="totalPrice"
                    type="number"
                    min="0"
                    placeholder="e.g. 1500"
                    value={form.totalPrice}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="revisionRounds">
                    Revision Rounds
                  </label>
                  <input
                    id="revisionRounds"
                    name="revisionRounds"
                    type="number"
                    min="0"
                    placeholder="e.g. 2"
                    value={form.revisionRounds}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
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
            {loading ? "Generating..." : "Generate Proposal"}
          </button>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <div className="w-10 h-10 border-4 border-[#E2E8F0] border-t-[#2563EB] rounded-full animate-spin" />
          <p className="text-[#64748B] text-sm">
            Claude AI is writing your proposal…
          </p>
        </div>
      )}

      {/* Editable Proposal Output */}
      {sections.length > 0 && !loading && (
        <>
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden" style={{ borderTop: "3px solid #2563EB" }}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <div>
                <span className="text-sm font-medium text-[#0F172A]">
                  {form.projectTitle || "Proposal"} — Editable Document
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

            {/* Document body */}
            <div className="px-8 py-8 max-w-3xl">
              {/* Proposal header */}
              <div className="mb-8 pb-5 border-b border-[#E2E8F0]">
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Project Proposal
                </p>
                <p className="text-xl font-bold text-[#0F172A]">
                  {form.projectTitle || "Project"}
                </p>
                <div className="mt-1.5 flex flex-col gap-0.5">
                  {form.clientName && (
                    <p className="text-sm text-[#64748B]">
                      Prepared for{" "}
                      <span className="text-[#0F172A] font-medium">
                        {form.clientName}
                      </span>
                      {form.clientCompany && ` · ${form.clientCompany}`}
                    </p>
                  )}
                  {form.yourName && (
                    <p className="text-sm text-[#64748B]">
                      From{" "}
                      <span className="text-[#0F172A] font-medium">
                        {form.yourName}
                      </span>
                      {form.yourEmail && ` · ${form.yourEmail}`}
                    </p>
                  )}
                  <p className="text-xs text-[#94A3B8] mt-1">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {sections.map((section, i) => (
                <div key={i} className="mb-6">
                  <div
                    className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-3 pb-2 pl-3 border-b border-[#E2E8F0]"
                    style={{ borderLeft: "3px solid #2563EB" }}
                  >
                    {section.heading}
                  </div>
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
                Try ScopeKit Pro free for 14 days — save proposals, share a
                live link clients can approve with one click, track invoices.
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

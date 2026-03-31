"use client";

import { useState } from "react";

type FormData = {
  projectName: string;
  clientName: string;
  projectType: string;
  keyDeliverables: string;
  timelineWeeks: string;
  revisionRounds: string;
  yourName: string;
  yourEmail: string;
};

const initialForm: FormData = {
  projectName: "",
  clientName: "",
  projectType: "Website Redesign",
  keyDeliverables: "",
  timelineWeeks: "",
  revisionRounds: "",
  yourName: "",
  yourEmail: "",
};

function boldify(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*/g, "");
}

function renderDocument(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-none pl-0 space-y-1.5 mb-4">
          {listBuffer.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 items-start text-[#374151] text-sm"
              style={{ lineHeight: "1.8" }}
            >
              <span className="text-[#2563EB] font-bold flex-shrink-0 mt-px">
                ✓
              </span>
              <span dangerouslySetInnerHTML={{ __html: boldify(item) }} />
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      flushList(String(i));
      elements.push(
        <h2
          key={i}
          className="text-[11px] font-bold text-[#0F172A] mt-8 mb-3 pb-2 uppercase tracking-widest pl-3 border-b border-[#E2E8F0]"
          style={{ borderLeft: "3px solid #2563EB" }}
          dangerouslySetInnerHTML={{ __html: boldify(line.slice(3)) }}
        />
      );
    } else if (line.startsWith("### ")) {
      flushList(String(i));
      elements.push(
        <h3 key={i} className="text-sm font-semibold text-[#0F172A] mt-4 mb-1" dangerouslySetInnerHTML={{ __html: boldify(line.slice(4)) }} />
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList(String(i));
      elements.push(<div key={i} className="h-2" />);
    } else {
      flushList(String(i));
      elements.push(
        <p key={i} className="text-[#374151] text-sm mb-2" style={{ lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: boldify(line) }} />
      );
    }
  });
  flushList("end");
  return elements;
}

function getPlainText(text: string) {
  return text
    .split("\n")
    .map((l) => (l.startsWith("## ") ? l.slice(3).toUpperCase() : l))
    .join("\n");
}

function buildPrintHTML(text: string, projectName: string, clientName?: string) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const sections = text.split(/^## /m).filter(Boolean);
  const body = sections
    .map((s) => {
      const [heading, ...rest] = s.split("\n");
      const content = rest
        .join("\n")
        .split("\n")
        .map((l) => {
          if (l.startsWith("- "))
            return (
              `<div style="display:flex;gap:8px;align-items:flex-start;margin:4px 0;font-size:14px;line-height:1.8;color:#374151">` +
              `<span style="color:#2563EB;font-weight:700;flex-shrink:0">✓</span>` +
              `<span>${l.slice(2)}</span></div>`
            );
          if (l.trim() === "") return "<div style='height:6px'></div>";
          return `<p style="margin:3px 0 8px;color:#374151;line-height:1.8">${l}</p>`;
        })
        .join("");
      return `<h2>${heading.trim()}</h2>${content}`;
    })
    .join("")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*/g, "");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${projectName} — Scope of Work</title><style>
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
    <div class="doc-title">${projectName}</div>
    ${clientName ? `<div class="doc-meta">Prepared for ${clientName}</div>` : ""}
    <div class="doc-meta">${date}</div>
  </div>
  ${body}
  </body></html>`;
}

export default function WebsiteSOWForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedSOW, setGeneratedSOW] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGeneratedSOW("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-sow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setGeneratedSOW(json.document);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getPlainText(generatedSOW));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const html = buildPrintHTML(generatedSOW, form.projectName || "Project", form.clientName);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
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
                placeholder="e.g. Acme Corp Website Redesign"
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
                placeholder="e.g. Acme Corp"
                value={form.clientName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="projectType">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Website Redesign</option>
              <option>New Website</option>
              <option>Landing Page</option>
              <option>E-commerce Store</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="keyDeliverables">
              Key Deliverables
            </label>
            <textarea
              id="keyDeliverables"
              name="keyDeliverables"
              rows={3}
              placeholder="e.g. Homepage, About page, Contact form, Mobile responsive design"
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
                placeholder="e.g. 6"
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
                placeholder="e.g. 2"
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

      {/* Generated Output */}
      {generatedSOW && !loading && (
        <>
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden" style={{ borderTop: "3px solid #2563EB" }}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <span className="text-sm font-medium text-[#0F172A]">
                {form.projectName || "Scope of Work"} — Generated Document
              </span>
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
              {/* Document header */}
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
              {renderDocument(generatedSOW)}
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

"use client";

import { useState } from "react";

type LineItem = {
  id: number;
  description: string;
  quantity: string;
  rate: string;
};

type FormData = {
  yourName: string;
  yourEmail: string;
  yourAddress: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  taxPercent: string;
  notes: string;
  paymentTerms: string;
  paymentDetails: string;
};

const today = new Date().toISOString().split("T")[0];
const due = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

const initialForm: FormData = {
  yourName: "",
  yourEmail: "",
  yourAddress: "",
  clientName: "",
  clientCompany: "",
  clientEmail: "",
  invoiceNumber: "",
  invoiceDate: today,
  dueDate: due,
  taxPercent: "",
  notes: "",
  paymentTerms: "",
  paymentDetails: "",
};

let nextId = 2;

const initialItems: LineItem[] = [
  { id: 1, description: "", quantity: "1", rate: "" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtDate(d: string) {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}, ${y}`;
}

export default function InvoiceGeneratorForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [items, setItems] = useState<LineItem[]>(initialItems);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (
    id: number,
    field: keyof Omit<LineItem, "id">,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: nextId++, description: "", quantity: "1", rate: "" },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const lineAmount = (item: LineItem) => {
    const q = parseFloat(item.quantity) || 0;
    const r = parseFloat(item.rate) || 0;
    return q * r;
  };

  const subtotal = items.reduce((sum, item) => sum + lineAmount(item), 0);
  const taxRate = parseFloat(form.taxPercent) || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const handleDownloadPDF = () => {
    const rowsHTML = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;color:#374151;font-size:13px">${item.description || "—"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;color:#374151;font-size:13px;text-align:center">${item.quantity || "—"}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;color:#374151;font-size:13px;text-align:right">$${fmt(parseFloat(item.rate) || 0)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;color:#374151;font-size:13px;text-align:right">$${fmt(lineAmount(item))}</td>
          </tr>`
      )
      .join("");

    const paymentSection =
      form.paymentTerms || form.paymentDetails
        ? `<div style="margin-top:24px;padding:14px 16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#94A3B8;margin-bottom:8px">Payment Information</div>
            ${form.paymentTerms ? `<div style="font-size:12px;color:#64748B;margin-bottom:4px"><strong style="color:#0F172A">Terms:</strong> ${form.paymentTerms}</div>` : ""}
            ${form.paymentDetails ? `<div style="font-size:12px;color:#64748B;white-space:pre-line;margin-top:4px">${form.paymentDetails}</div>` : ""}
          </div>`
        : "";

    const notesSection = form.notes
      ? `<div style="margin-top:16px;padding:14px 16px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#94A3B8;margin-bottom:6px">Notes</div>
          <div style="font-size:13px;color:#64748B;white-space:pre-line">${form.notes}</div>
        </div>`
      : "";

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Invoice ${form.invoiceNumber || ""}</title>
<style>
  body{font-family:Inter,Arial,sans-serif;max-width:760px;margin:40px auto;padding:24px;color:#0F172A;font-size:14px;line-height:1.6}
  table{width:100%;border-collapse:collapse}
  @media print{body{margin:20px}}
</style></head><body>

<div style="border-top:3px solid #2563EB;padding-top:20px;margin-bottom:32px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div>
      <div style="font-size:20px;font-weight:700;color:#0F172A;margin-bottom:4px">${form.yourName || "Your Company"}</div>
      ${form.yourEmail ? `<div style="font-size:12px;color:#64748B">${form.yourEmail}</div>` : ""}
      ${form.yourAddress ? `<div style="font-size:12px;color:#64748B;white-space:pre-line;margin-top:2px">${form.yourAddress}</div>` : ""}
    </div>
    <div style="text-align:right">
      <div style="font-size:24px;font-weight:800;color:#2563EB;letter-spacing:.05em">INVOICE</div>
      ${form.invoiceNumber ? `<div style="font-size:13px;color:#64748B;margin-top:2px">${form.invoiceNumber}</div>` : ""}
    </div>
  </div>
</div>

<div style="display:flex;justify-content:space-between;margin-bottom:32px">
  <div>
    <div style="font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#94A3B8;margin-bottom:6px">Bill To</div>
    <div style="font-weight:600;color:#0F172A;font-size:14px">${form.clientName || "Client Name"}</div>
    ${form.clientCompany ? `<div style="font-size:12px;color:#64748B">${form.clientCompany}</div>` : ""}
    ${form.clientEmail ? `<div style="font-size:12px;color:#64748B">${form.clientEmail}</div>` : ""}
  </div>
  <div style="text-align:right">
    ${form.invoiceDate ? `<div style="font-size:12px;color:#64748B">Invoice Date: <span style="color:#0F172A">${fmtDate(form.invoiceDate)}</span></div>` : ""}
    ${form.dueDate ? `<div style="font-size:12px;color:#64748B;margin-top:2px">Due Date: <span style="color:#0F172A;font-weight:600">${fmtDate(form.dueDate)}</span></div>` : ""}
  </div>
</div>

<table>
  <thead>
    <tr style="background:#F8FAFC">
      <th style="padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748B;font-weight:600;border-bottom:2px solid #E2E8F0">Description</th>
      <th style="padding:10px 12px;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748B;font-weight:600;border-bottom:2px solid #E2E8F0">Qty</th>
      <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748B;font-weight:600;border-bottom:2px solid #E2E8F0">Rate</th>
      <th style="padding:10px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748B;font-weight:600;border-bottom:2px solid #E2E8F0">Amount</th>
    </tr>
  </thead>
  <tbody>${rowsHTML}</tbody>
</table>

<div style="display:flex;justify-content:flex-end;margin-top:16px">
  <div style="min-width:220px">
    <div style="display:flex;justify-content:space-between;padding:6px 12px;font-size:13px;color:#64748B">
      <span>Subtotal</span><span style="color:#374151">$${fmt(subtotal)}</span>
    </div>
    ${taxRate > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 12px;font-size:13px;color:#64748B"><span>Tax (${taxRate}%)</span><span style="color:#374151">$${fmt(taxAmount)}</span></div>` : ""}
    <div style="display:flex;justify-content:space-between;padding:10px 12px;background:#2563EB;border-radius:6px;margin-top:6px">
      <span style="font-size:13px;font-weight:700;color:#fff">Total Due</span>
      <span style="font-size:15px;font-weight:800;color:#fff">$${fmt(total)}</span>
    </div>
  </div>
</div>

${paymentSection}
${notesSection}

</body></html>`;

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
  const sectionLabel =
    "text-xs font-semibold text-[#94A3B8] uppercase tracking-widest mb-4";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── Left column: Form ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 sm:p-8 space-y-6">

        {/* Your Details */}
        <div>
          <p className={sectionLabel}>Your Details</p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label className={labelClass} htmlFor="yourAddress">
                Your Address
              </label>
              <textarea
                id="yourAddress"
                name="yourAddress"
                rows={2}
                placeholder="e.g. 123 Main St, San Francisco, CA 94105"
                value={form.yourAddress}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div>
          <p className={sectionLabel}>Client Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="clientEmail">
                Client Email
              </label>
              <input
                id="clientEmail"
                name="clientEmail"
                type="email"
                placeholder="e.g. sarah@acmecorp.com"
                value={form.clientEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div>
          <p className={sectionLabel}>Invoice Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="invoiceNumber">
                Invoice Number
              </label>
              <input
                id="invoiceNumber"
                name="invoiceNumber"
                type="text"
                placeholder="e.g. INV-001"
                value={form.invoiceNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="invoiceDate">
                Invoice Date
              </label>
              <input
                id="invoiceDate"
                name="invoiceDate"
                type="date"
                value={form.invoiceDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <p className={sectionLabel}>Line Items</p>
          <div className="space-y-2">
            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[1fr_72px_96px_88px_32px] gap-2 px-1">
              <span className="text-xs font-medium text-[#94A3B8]">Description</span>
              <span className="text-xs font-medium text-[#94A3B8] text-center">Qty</span>
              <span className="text-xs font-medium text-[#94A3B8] text-right">Rate (USD)</span>
              <span className="text-xs font-medium text-[#94A3B8] text-right">Amount</span>
              <span />
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_72px_96px_88px_32px] gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="e.g. Logo design"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(item.id, "description", e.target.value)
                  }
                  className={inputClass}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(item.id, "quantity", e.target.value)
                  }
                  className={inputClass + " text-center"}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(item.id, "rate", e.target.value)
                  }
                  className={inputClass + " text-right"}
                />
                <div className="flex items-center justify-end">
                  <span className="text-sm text-[#0F172A] font-medium tabular-nums">
                    ${fmt(lineAmount(item))}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="flex items-center justify-center w-8 h-8 rounded-md text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Remove item"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="mt-1 flex items-center gap-1.5 text-sm text-[#2563EB] font-medium hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Add Item
            </button>
          </div>

          {/* Running totals */}
          <div className="mt-4 flex justify-end">
            <div className="min-w-[180px] space-y-1 text-sm">
              <div className="flex justify-between text-[#64748B]">
                <span>Subtotal</span>
                <span className="tabular-nums">${fmt(subtotal)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between text-[#64748B]">
                  <span>Tax ({taxRate}%)</span>
                  <span className="tabular-nums">${fmt(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-[#0F172A] border-t border-[#E2E8F0] pt-1.5 mt-1">
                <span>Total Due</span>
                <span className="tabular-nums">${fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax + Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="taxPercent">
              Tax Rate (%)
            </label>
            <input
              id="taxPercent"
              name="taxPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="e.g. 10"
              value={form.taxPercent}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              placeholder="e.g. Thank you for your business!"
              value={form.notes}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <p className={sectionLabel}>Payment Information</p>
          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="paymentTerms">
                Payment Terms
              </label>
              <input
                id="paymentTerms"
                name="paymentTerms"
                type="text"
                placeholder="e.g. Due on receipt, Net 15, Net 30"
                value={form.paymentTerms}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="paymentDetails">
                Payment Details
              </label>
              <textarea
                id="paymentDetails"
                name="paymentDetails"
                rows={3}
                placeholder={
                  "e.g. PayPal: your@email.com · or ACH: Routing 021000021, Acct 1234567890 · or IBAN: GB29NWBK60161331926819 · or UPI: yourname@upi"
                }
                value={form.paymentDetails}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right column: Live Invoice Preview ── */}
      <div className="lg:sticky lg:top-8 space-y-6">
        <div
          className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden"
          style={{ borderTop: "3px solid #2563EB" }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <span className="text-sm font-medium text-[#0F172A]">
              {form.invoiceNumber ? `Invoice ${form.invoiceNumber}` : "Invoice"}{" "}
              — Live Preview
            </span>
            <button
              onClick={handleDownloadPDF}
              className="bg-[#0F172A] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-[#1e293b] transition-colors"
            >
              Download PDF
            </button>
          </div>

          {/* Invoice body */}
          <div className="px-6 py-6 text-sm">
            {/* Header row: your info + INVOICE label */}
            <div className="flex justify-between items-start mb-6 pb-5 border-b border-[#E2E8F0]">
              <div>
                <p className="font-bold text-[#0F172A] text-base">
                  {form.yourName || <span className="text-[#CBD5E1]">Your Company</span>}
                </p>
                {form.yourEmail && (
                  <p className="text-xs text-[#64748B] mt-0.5">{form.yourEmail}</p>
                )}
                {form.yourAddress && (
                  <p className="text-xs text-[#64748B] mt-0.5 whitespace-pre-line">
                    {form.yourAddress}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-2xl font-extrabold text-[#2563EB] tracking-wide">
                  INVOICE
                </p>
                {form.invoiceNumber && (
                  <p className="text-xs text-[#64748B] mt-0.5">{form.invoiceNumber}</p>
                )}
              </div>
            </div>

            {/* Bill to + dates */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Bill To
                </p>
                <p className="font-semibold text-[#0F172A]">
                  {form.clientName || <span className="text-[#CBD5E1]">Client Name</span>}
                </p>
                {form.clientCompany && (
                  <p className="text-xs text-[#64748B]">{form.clientCompany}</p>
                )}
                {form.clientEmail && (
                  <p className="text-xs text-[#64748B]">{form.clientEmail}</p>
                )}
              </div>
              <div className="text-right space-y-0.5 shrink-0 ml-4">
                {form.invoiceDate && (
                  <p className="text-xs text-[#64748B]">
                    Invoice Date:{" "}
                    <span className="text-[#0F172A]">{fmtDate(form.invoiceDate)}</span>
                  </p>
                )}
                {form.dueDate && (
                  <p className="text-xs text-[#64748B]">
                    Due Date:{" "}
                    <span className="text-[#0F172A] font-semibold">
                      {fmtDate(form.dueDate)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Line items table */}
            <div className="rounded-lg border border-[#E2E8F0] overflow-hidden mb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
                      Description
                    </th>
                    <th className="px-3 py-2.5 text-center font-semibold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] w-10">
                      Qty
                    </th>
                    <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] w-16">
                      Rate
                    </th>
                    <th className="px-3 py-2.5 text-right font-semibold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0] w-16">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id} className={i % 2 === 1 ? "bg-[#F8FAFC]" : ""}>
                      <td className="px-3 py-2.5 text-[#374151]">
                        {item.description || <span className="text-[#CBD5E1]">—</span>}
                      </td>
                      <td className="px-3 py-2.5 text-[#374151] text-center tabular-nums">
                        {item.quantity || "—"}
                      </td>
                      <td className="px-3 py-2.5 text-[#374151] text-right tabular-nums">
                        ${fmt(parseFloat(item.rate) || 0)}
                      </td>
                      <td className="px-3 py-2.5 text-[#374151] text-right tabular-nums font-medium">
                        ${fmt(lineAmount(item))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-5">
              <div className="w-44 space-y-1">
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${fmt(subtotal)}</span>
                </div>
                {taxRate > 0 && (
                  <div className="flex justify-between text-xs text-[#64748B]">
                    <span>Tax ({taxRate}%)</span>
                    <span className="tabular-nums">${fmt(taxAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center bg-[#2563EB] text-white rounded-lg px-3 py-2 mt-1.5">
                  <span className="text-xs font-semibold">Total Due</span>
                  <span className="text-sm font-bold tabular-nums">${fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {(form.paymentTerms || form.paymentDetails) && (
              <div
                className="mb-4 rounded-lg overflow-hidden"
                style={{ border: "1px solid #E2E8F0", borderLeft: "3px solid #2563EB" }}
              >
                <div className="bg-[#F8FAFC] px-3.5 py-2 border-b border-[#E2E8F0]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">
                    Payment Information
                  </p>
                </div>
                <div className="bg-[#F8FAFC] px-3.5 py-3 space-y-1.5">
                  {form.paymentDetails && (
                    <div className="space-y-0.5">
                      {form.paymentDetails.split("\n").map((line, i) => (
                        <p key={i} className="text-xs text-[#374151]">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                  {form.paymentTerms && (
                    <p className="text-xs text-[#94A3B8] pt-1 border-t border-[#E2E8F0] mt-1">
                      Terms:{" "}
                      <span className="text-[#64748B]">{form.paymentTerms}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {form.notes && (
              <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1.5">
                  Notes
                </p>
                <p className="text-xs text-[#64748B] whitespace-pre-line">
                  {form.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pro CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 sm:p-6">
          <p className="text-[#0F172A] font-semibold text-sm">
            Want to save this invoice and track when it gets paid?
          </p>
          <p className="text-[#64748B] text-xs mt-1 mb-4">
            Try ScopeKit Pro free for 14 days — save invoices, share live
            payment links, track overdue balances.
          </p>
          <a
            href="/signup"
            className="inline-block bg-[#2563EB] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </div>
  );
}

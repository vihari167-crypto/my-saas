"use client";

import { useState } from "react";

type FormData = {
  hourlyRate: string;
  originalHours: string;
  extraHours: string;
  extraRevisions: string;
  hoursPerRevision: string;
  extraMeetings: string;
  hoursPerMeeting: string;
  otherHours: string;
};

const initialForm: FormData = {
  hourlyRate: "",
  originalHours: "",
  extraHours: "",
  extraRevisions: "",
  hoursPerRevision: "2",
  extraMeetings: "",
  hoursPerMeeting: "1",
  otherHours: "",
};

function n(s: string) {
  return parseFloat(s) || 0;
}

function usd(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function calculate(form: FormData) {
  const hourlyRate = n(form.hourlyRate);
  const originalHours = n(form.originalHours);

  const extraHours = n(form.extraHours);
  const revisionHours = n(form.extraRevisions) * n(form.hoursPerRevision);
  const meetingHours = n(form.extraMeetings) * n(form.hoursPerMeeting);
  const otherHours = n(form.otherHours);

  const totalUnbilledHours =
    extraHours + revisionHours + meetingHours + otherHours;
  const originalProjectValue = originalHours * hourlyRate;
  const totalMoneyLost = totalUnbilledHours * hourlyRate;
  const percentageLost =
    originalProjectValue > 0
      ? (totalMoneyLost / originalProjectValue) * 100
      : 0;
  const futureProjectsFunded =
    originalProjectValue > 0
      ? totalMoneyLost / originalProjectValue
      : 0;
  const shouldHaveCharged = originalProjectValue + totalMoneyLost;

  return {
    hourlyRate,
    originalHours,
    originalProjectValue,
    extraHours,
    revisionHours,
    meetingHours,
    otherHours,
    totalUnbilledHours,
    totalMoneyLost,
    percentageLost,
    futureProjectsFunded,
    shouldHaveCharged,
  };
}

export default function ScopeCreepCalculatorForm() {
  const [form, setForm] = useState<FormData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calc = calculate(form);
  const hasRate = calc.hourlyRate > 0;
  const hasOriginal = calc.originalProjectValue > 0;
  const hasLoss = calc.totalMoneyLost > 0;

  const inputClass =
    "w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow";
  const labelClass = "block text-xs font-medium text-[#64748B] mb-1.5";
  const sectionLabel =
    "text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
      {/* ── Left column: Form ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 sm:p-8 space-y-7">

        {/* Base */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold shrink-0">1</span>
            <p className={sectionLabel + " mb-0"}>Your Project</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="hourlyRate">
                Your Hourly Rate (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  className={inputClass + " pl-7"}
                />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="originalHours">
                Original Agreed Project Hours
              </label>
              <div className="relative">
                <input
                  id="originalHours"
                  name="originalHours"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.originalHours}
                  onChange={handleChange}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">hrs</span>
              </div>
            </div>
          </div>
          {hasRate && (
            <p className="mt-2.5 text-xs text-[#94A3B8]">
              Original project value:{" "}
              <span className="font-semibold text-[#64748B]">
                {usd(calc.originalProjectValue)}
              </span>
            </p>
          )}
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* Extra work */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold shrink-0">2</span>
            <p className={sectionLabel + " mb-0"}>Unplanned Extra Work</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="extraHours">
              Extra hours added by client without extra pay
            </label>
            <div className="relative">
              <input
                id="extraHours"
                name="extraHours"
                type="number"
                min="0"
                placeholder="0"
                value={form.extraHours}
                onChange={handleChange}
                className={inputClass + " pr-10"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">hrs</span>
            </div>
          </div>
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* Revisions */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold shrink-0">3</span>
            <p className={sectionLabel + " mb-0"}>Extra Revision Rounds</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="extraRevisions">
                Rounds beyond what was agreed
              </label>
              <input
                id="extraRevisions"
                name="extraRevisions"
                type="number"
                min="0"
                placeholder="0"
                value={form.extraRevisions}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="hoursPerRevision">
                Hours per revision round
              </label>
              <div className="relative">
                <input
                  id="hoursPerRevision"
                  name="hoursPerRevision"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="2"
                  value={form.hoursPerRevision}
                  onChange={handleChange}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">hrs</span>
              </div>
            </div>
          </div>
          {n(form.extraRevisions) > 0 && (
            <p className="mt-2 text-xs text-[#94A3B8]">
              {calc.revisionHours} unbilled hrs from revisions
              {calc.hourlyRate > 0 && (
                <span className="text-[#EF4444] font-medium">
                  {" "}({usd(calc.revisionHours * calc.hourlyRate)} lost)
                </span>
              )}
            </p>
          )}
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* Meetings */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold shrink-0">4</span>
            <p className={sectionLabel + " mb-0"}>Unplanned Meetings</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="extraMeetings">
                Number of unplanned meetings
              </label>
              <input
                id="extraMeetings"
                name="extraMeetings"
                type="number"
                min="0"
                placeholder="0"
                value={form.extraMeetings}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="hoursPerMeeting">
                Hours per meeting
              </label>
              <div className="relative">
                <input
                  id="hoursPerMeeting"
                  name="hoursPerMeeting"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="1"
                  value={form.hoursPerMeeting}
                  onChange={handleChange}
                  className={inputClass + " pr-10"}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">hrs</span>
              </div>
            </div>
          </div>
          {n(form.extraMeetings) > 0 && (
            <p className="mt-2 text-xs text-[#94A3B8]">
              {calc.meetingHours} unbilled hrs from meetings
              {calc.hourlyRate > 0 && (
                <span className="text-[#EF4444] font-medium">
                  {" "}({usd(calc.meetingHours * calc.hourlyRate)} lost)
                </span>
              )}
            </p>
          )}
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* Other */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold shrink-0">5</span>
            <p className={sectionLabel + " mb-0"}>Other Unbilled Hours</p>
          </div>
          <div>
            <label className={labelClass} htmlFor="otherHours">
              Any other hours worked but not charged
            </label>
            <div className="relative">
              <input
                id="otherHours"
                name="otherHours"
                type="number"
                min="0"
                placeholder="0"
                value={form.otherHours}
                onChange={handleChange}
                className={inputClass + " pr-10"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right column: Results ── */}
      <div className="lg:sticky lg:top-8 space-y-4">

        {/* TOTAL MONEY LOST — the hero number */}
        <div
          className="rounded-xl overflow-hidden shadow-sm"
          style={{ border: "1px solid #FECACA", borderTop: "3px solid #EF4444" }}
        >
          <div className="bg-[#FEF2F2] px-5 py-5 border-b border-[#FECACA]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FCA5A5] mb-2">
              Total Money Lost to Scope Creep
            </p>
            <div className="flex items-end gap-2">
              <span
                className="font-extrabold tabular-nums leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  color: hasLoss ? "#EF4444" : "#FCA5A5",
                }}
              >
                {hasRate ? usd(calc.totalMoneyLost) : "—"}
              </span>
            </div>
            {hasLoss && (
              <p className="text-xs text-[#F87171] mt-2 font-medium">
                {calc.totalUnbilledHours} hours of your time — unpaid.
              </p>
            )}
            {hasRate && !hasLoss && (
              <p className="text-xs text-[#FCA5A5] mt-2">
                Add your extra hours above to see your losses.
              </p>
            )}
            {!hasRate && (
              <p className="text-xs text-[#FCA5A5] mt-2">
                Enter your hourly rate and project hours to calculate.
              </p>
            )}
          </div>
          {hasLoss && hasOriginal && (
            <div className="bg-white px-5 py-3">
              <p className="text-xs text-[#64748B]">
                That&apos;s{" "}
                <span className="font-semibold text-[#EF4444]">
                  {calc.percentageLost.toFixed(0)}% of your original project value
                </span>
                {" "}worked for free.
              </p>
            </div>
          )}
        </div>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">
              Total Unbilled Hours
            </p>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              {hasRate ? calc.totalUnbilledHours.toFixed(1) : "—"}
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">hours not paid</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">
              % of Project Lost
            </p>
            <p
              className="text-2xl font-bold tabular-nums"
              style={{ color: calc.percentageLost > 25 ? "#EF4444" : calc.percentageLost > 10 ? "#F59E0B" : "#0F172A" }}
            >
              {hasLoss && hasOriginal ? `${calc.percentageLost.toFixed(0)}%` : "—"}
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">of original value</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-1.5">
              Future Projects Funded
            </p>
            <p className="text-2xl font-bold text-[#0F172A] tabular-nums">
              {hasLoss && hasOriginal ? calc.futureProjectsFunded.toFixed(2) : "—"}
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">projects you could have won</p>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}
          >
            <p className="text-[10px] font-semibold text-[#86EFAC] uppercase tracking-wide mb-1.5">
              Should Have Charged
            </p>
            <p className="text-2xl font-bold text-[#16A34A] tabular-nums">
              {hasLoss ? usd(calc.shouldHaveCharged) : "—"}
            </p>
            <p className="text-[10px] text-[#86EFAC] mt-0.5">
              {hasLoss
                ? `vs ${usd(calc.originalProjectValue)} agreed`
                : "your fair total"}
            </p>
          </div>
        </div>

        {/* Hour breakdown */}
        {hasLoss && (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #E2E8F0", borderLeft: "3px solid #EF4444" }}
          >
            <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                Where the Hours Went
              </p>
            </div>
            <div className="bg-white divide-y divide-[#F1F5F9]">
              {[
                { label: "Extra work added by client", hours: calc.extraHours },
                { label: "Extra revision rounds", hours: calc.revisionHours },
                { label: "Unplanned meetings", hours: calc.meetingHours },
                { label: "Other unbilled work", hours: calc.otherHours },
              ]
                .filter((r) => r.hours > 0)
                .map((row) => {
                  const pct =
                    calc.totalUnbilledHours > 0
                      ? (row.hours / calc.totalUnbilledHours) * 100
                      : 0;
                  return (
                    <div key={row.label} className="px-4 py-2.5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-[#374151]">{row.label}</span>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#EF4444] tabular-nums">
                            {row.hours % 1 === 0 ? row.hours : row.hours.toFixed(1)} hrs
                          </span>
                          {calc.hourlyRate > 0 && (
                            <span className="text-[10px] text-[#94A3B8] ml-1.5">
                              ({usd(row.hours * calc.hourlyRate)})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#EF4444] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* SOW nudge */}
        <div
          className="rounded-xl px-5 py-4 flex items-start gap-3"
          style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
        >
          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#2563EB" strokeWidth="1.5"/>
            <path d="M8 7v4M8 5.5v.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-[#1D4ED8]">
            Protect your next project — add a clear scope of work before you
            start.{" "}
            <a
              href="/tools/sow-generator"
              className="font-semibold underline underline-offset-2 hover:text-[#1e40af]"
            >
              Generate a free SOW →
            </a>
          </p>
        </div>

        {/* Pro CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-[#0F172A] font-semibold text-sm">
            Stop losing money to scope creep.
          </p>
          <p className="text-[#64748B] text-xs mt-1 mb-4">
            ScopeKit Pro lets you create clear SOWs, proposals, and invoices
            with defined deliverables — so clients can&apos;t quietly expand
            the scope without agreeing to pay more.
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

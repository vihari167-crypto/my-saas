"use client";

import { useState } from "react";

type FormData = {
  // Expenses
  rent: string;
  food: string;
  transport: string;
  subscriptions: string;
  otherPersonal: string;
  // Business
  taxPercent: string;
  healthInsurance: string;
  businessExpenses: string;
  desiredProfit: string;
  // Work
  hoursPerWeek: string;
  billablePercent: string;
  weeksOff: string;
};

const initialForm: FormData = {
  rent: "",
  food: "",
  transport: "",
  subscriptions: "",
  otherPersonal: "",
  taxPercent: "30",
  healthInsurance: "",
  businessExpenses: "",
  desiredProfit: "",
  hoursPerWeek: "40",
  billablePercent: "70",
  weeksOff: "2",
};

function n(s: string) {
  return parseFloat(s) || 0;
}

function usd(amount: number, decimals = 0) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function calculate(form: FormData) {
  // Expenses
  const monthlyPersonal =
    n(form.rent) +
    n(form.food) +
    n(form.transport) +
    n(form.subscriptions) +
    n(form.otherPersonal);

  // Monthly net needed (after tax)
  const monthlyNetNeeded =
    monthlyPersonal +
    n(form.healthInsurance) +
    n(form.businessExpenses) +
    n(form.desiredProfit);

  // Gross up for taxes
  const taxRate = Math.min(n(form.taxPercent), 99) / 100;
  const monthlyGrossNeeded =
    taxRate < 1 ? monthlyNetNeeded / (1 - taxRate) : monthlyNetNeeded;

  const annualIncomeNeeded = monthlyGrossNeeded * 12;

  // Work hours
  const hoursPerWeek = n(form.hoursPerWeek);
  const billableRate = Math.min(n(form.billablePercent), 100) / 100;
  const weeksOff = n(form.weeksOff);
  const weeksWorked = Math.max(52 - weeksOff, 1);
  const billableHoursPerWeek = hoursPerWeek * billableRate;
  const annualBillableHours = billableHoursPerWeek * weeksWorked;

  const minHourly =
    annualBillableHours > 0 ? annualIncomeNeeded / annualBillableHours : 0;
  const recommendedHourly = minHourly * 1.2;

  // Project rates
  const project1Week = recommendedHourly * billableHoursPerWeek;
  const project2Week = project1Week * 2;
  const project1Month = recommendedHourly * billableHoursPerWeek * 4.33;

  return {
    monthlyPersonal,
    monthlyNetNeeded,
    monthlyGrossNeeded,
    annualIncomeNeeded,
    annualBillableHours,
    billableHoursPerWeek,
    weeksWorked,
    minHourly,
    recommendedHourly,
    project1Week,
    project2Week,
    project1Month,
  };
}

export default function RateCalculatorForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calc = calculate(form);

  const handleCopyRate = async () => {
    const rate =
      calc.recommendedHourly > 0
        ? `$${Math.ceil(calc.recommendedHourly)}/hr`
        : "—";
    await navigator.clipboard.writeText(rate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass =
    "w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow";
  const labelClass = "block text-xs font-medium text-[#64748B] mb-1.5";
  const sectionLabel =
    "text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4";

  const hasRate = calc.recommendedHourly > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
      {/* ── Left column: Form ── */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 sm:p-8 space-y-7">

        {/* EXPENSES */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold">1</span>
            <p className={sectionLabel + " mb-0"}>Personal Expenses (Monthly)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="rent">Rent / Housing</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="rent" name="rent" type="number" min="0" placeholder="0" value={form.rent} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="food">Food & Groceries</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="food" name="food" type="number" min="0" placeholder="0" value={form.food} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="transport">Transport</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="transport" name="transport" type="number" min="0" placeholder="0" value={form.transport} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="subscriptions">Subscriptions & Software</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="subscriptions" name="subscriptions" type="number" min="0" placeholder="0" value={form.subscriptions} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="otherPersonal">Other Personal Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="otherPersonal" name="otherPersonal" type="number" min="0" placeholder="0" value={form.otherPersonal} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* BUSINESS */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold">2</span>
            <p className={sectionLabel + " mb-0"}>Business Costs (Monthly)</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="taxPercent">Taxes Set Aside (%)</label>
              <div className="relative">
                <input id="taxPercent" name="taxPercent" type="number" min="0" max="99" placeholder="30" value={form.taxPercent} onChange={handleChange} className={inputClass + " pr-7"} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">%</span>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="healthInsurance">Health Insurance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="healthInsurance" name="healthInsurance" type="number" min="0" placeholder="0" value={form.healthInsurance} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="businessExpenses">Business Expenses (equipment, internet…)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="businessExpenses" name="businessExpenses" type="number" min="0" placeholder="0" value={form.businessExpenses} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="desiredProfit">Desired Monthly Profit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">$</span>
                <input id="desiredProfit" name="desiredProfit" type="number" min="0" placeholder="0" value={form.desiredProfit} onChange={handleChange} className={inputClass + " pl-7"} />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#F1F5F9]" />

        {/* WORK */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold">3</span>
            <p className={sectionLabel + " mb-0"}>Work Schedule</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="hoursPerWeek">Hours Available / Week</label>
              <input id="hoursPerWeek" name="hoursPerWeek" type="number" min="1" max="168" placeholder="40" value={form.hoursPerWeek} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="billablePercent">Billable Hours (%)</label>
              <div className="relative">
                <input id="billablePercent" name="billablePercent" type="number" min="1" max="100" placeholder="70" value={form.billablePercent} onChange={handleChange} className={inputClass + " pr-7"} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#94A3B8]">%</span>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="weeksOff">Weeks Off / Year</label>
              <input id="weeksOff" name="weeksOff" type="number" min="0" max="51" placeholder="2" value={form.weeksOff} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <p className="mt-3 text-xs text-[#94A3B8]">
            Not all hours are billable — account for admin, marketing, and unpaid time. 70% is a common starting point.
          </p>
        </div>
      </div>

      {/* ── Right column: Results dashboard ── */}
      <div className="lg:sticky lg:top-8 space-y-4">

        {/* Primary rate card */}
        <div
          className="rounded-xl overflow-hidden shadow-sm"
          style={{ border: "1px solid #BFDBFE", borderTop: "3px solid #2563EB" }}
        >
          <div className="bg-[#EFF6FF] px-5 py-4 border-b border-[#BFDBFE]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#93C5FD] mb-1">
              Recommended Hourly Rate
            </p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-extrabold text-[#2563EB] tabular-nums leading-none">
                {hasRate ? usd(Math.ceil(calc.recommendedHourly)) : "—"}
              </span>
              {hasRate && (
                <span className="text-sm text-[#60A5FA] font-medium mb-0.5">/hr</span>
              )}
            </div>
            {hasRate && (
              <p className="text-xs text-[#93C5FD] mt-1.5">
                Minimum + 20% buffer for gaps and unexpected costs
              </p>
            )}
          </div>
          <div className="bg-white px-5 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">Minimum Rate</p>
              <p className="text-lg font-bold text-[#0F172A] tabular-nums">
                {hasRate ? usd(Math.ceil(calc.minHourly)) : "—"}
                {hasRate && <span className="text-xs font-normal text-[#64748B] ml-1">/hr</span>}
              </p>
            </div>
            <button
              onClick={handleCopyRate}
              disabled={!hasRate}
              className="flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:underline disabled:text-[#94A3B8] disabled:no-underline disabled:cursor-not-allowed"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M2.5 8.5H2a1 1 0 01-1-1V2a1 1 0 011-1h5.5a1 1 0 011 1v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              {copied ? "Copied!" : "Copy My Rate"}
            </button>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Monthly Income Needed",
              value: hasRate ? usd(calc.monthlyGrossNeeded) : "—",
              sub: "gross, pre-tax",
            },
            {
              label: "Annual Income Needed",
              value: hasRate ? usd(calc.annualIncomeNeeded) : "—",
              sub: "gross, pre-tax",
            },
            {
              label: "Billable Hours / Year",
              value: hasRate ? Math.round(calc.annualBillableHours).toString() : "—",
              sub: `${Math.round(calc.billableHoursPerWeek)} hrs/wk · ${calc.weeksWorked} wks`,
            },
          ].map((m) => (
            <div key={m.label} className="bg-white border border-[#E2E8F0] rounded-xl p-3.5">
              <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide leading-tight mb-1.5">
                {m.label}
              </p>
              <p className="text-base font-bold text-[#0F172A] tabular-nums">{m.value}</p>
              <p className="text-[10px] text-[#94A3B8] mt-0.5">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Project rate examples */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              Project Rate Examples
            </p>
          </div>
          <div className="divide-y divide-[#F1F5F9]">
            {[
              {
                label: "1-Week Project",
                sub: `${Math.round(calc.billableHoursPerWeek)} billable hrs`,
                value: calc.project1Week,
              },
              {
                label: "2-Week Project",
                sub: `${Math.round(calc.billableHoursPerWeek * 2)} billable hrs`,
                value: calc.project2Week,
              },
              {
                label: "1-Month Project",
                sub: `${Math.round(calc.billableHoursPerWeek * 4.33)} billable hrs`,
                value: calc.project1Month,
              },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{p.label}</p>
                  <p className="text-xs text-[#94A3B8]">{p.sub}</p>
                </div>
                <p className="text-base font-bold text-[#0F172A] tabular-nums">
                  {hasRate ? usd(Math.ceil(p.value)) : "—"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculation breakdown */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid #E2E8F0", borderLeft: "3px solid #2563EB" }}
        >
          <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
              How We Calculated This
            </p>
          </div>
          <div className="bg-white px-4 py-3 space-y-2 text-xs text-[#64748B]">
            <div className="flex justify-between">
              <span>Personal expenses / month</span>
              <span className="tabular-nums font-medium text-[#374151]">{usd(calc.monthlyPersonal)}</span>
            </div>
            <div className="flex justify-between">
              <span>+ Business costs + profit</span>
              <span className="tabular-nums font-medium text-[#374151]">
                {usd(calc.monthlyNetNeeded - calc.monthlyPersonal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>= Monthly net needed</span>
              <span className="tabular-nums font-medium text-[#374151]">{usd(calc.monthlyNetNeeded)}</span>
            </div>
            <div className="flex justify-between">
              <span>÷ (1 − {n(form.taxPercent)}% tax) = monthly gross</span>
              <span className="tabular-nums font-medium text-[#374151]">{usd(calc.monthlyGrossNeeded)}</span>
            </div>
            <div className="flex justify-between">
              <span>× 12 = annual income needed</span>
              <span className="tabular-nums font-medium text-[#374151]">{usd(calc.annualIncomeNeeded)}</span>
            </div>
            <div className="flex justify-between border-t border-[#F1F5F9] pt-2">
              <span>{n(form.hoursPerWeek)}h/wk × {n(form.billablePercent)}% × {calc.weeksWorked} wks</span>
              <span className="tabular-nums font-medium text-[#374151]">{Math.round(calc.annualBillableHours)} hrs/yr</span>
            </div>
            <div className="flex justify-between">
              <span>Annual income ÷ billable hours</span>
              <span className="tabular-nums font-medium text-[#374151]">
                {hasRate ? usd(calc.minHourly, 2) + "/hr" : "—"}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#F1F5F9] pt-2 font-semibold text-[#0F172A]">
              <span>× 1.20 buffer = your rate</span>
              <span className="tabular-nums text-[#2563EB]">
                {hasRate ? usd(calc.recommendedHourly, 2) + "/hr" : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Pro CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-[#0F172A] font-semibold text-sm">
            Know your rate. Now win the project.
          </p>
          <p className="text-[#64748B] text-xs mt-1 mb-4">
            ScopeKit Pro lets you generate proposals, scope of work docs, and
            invoices at your calculated rate — and share them with clients in
            one click.
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

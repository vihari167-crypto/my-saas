import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Tools for Freelancers — ScopeKit",
  description:
    "Free AI-powered tools for freelancers: scope of work generator, proposal generator, invoice generator, rate calculator, and scope creep calculator.",
};

const tools = [
  {
    name: "Scope of Work Generator",
    description:
      "Generate a professional scope of work for any industry in seconds.",
    href: "/tools/sow-generator",
  },
  {
    name: "Freelance Proposal Generator",
    description: "Win more clients with a polished AI-written proposal.",
    href: "/tools/freelance-proposal",
  },
  {
    name: "Invoice Generator",
    description: "Create professional invoices instantly with live preview.",
    href: "/tools/invoice-generator",
  },
  {
    name: "Freelance Rate Calculator",
    description: "Find out exactly what hourly rate you should be charging.",
    href: "/tools/rate-calculator",
  },
  {
    name: "Scope Creep Calculator",
    description:
      "See exactly how much money unplanned extra work is costing you.",
    href: "/tools/scope-creep-calculator",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Free Tools for Freelancers
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Everything you need to win projects, set the right rate, and
            protect your time. Free, no signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.href}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="text-[#0F172A] font-semibold text-lg">
                {tool.name}
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed flex-1">
                {tool.description}
              </p>
              <Link
                href={tool.href}
                className="text-[#2563EB] text-sm font-medium hover:underline mt-1"
              >
                Try Free →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

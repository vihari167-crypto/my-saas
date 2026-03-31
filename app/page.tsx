import Link from "next/link";

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

const steps = [
  {
    number: "1",
    title: "Fill the Form",
    description:
      "Answer a few quick questions about your project and client.",
  },
  {
    number: "2",
    title: "AI Generates Your Document",
    description:
      "Claude AI writes a professional document tailored to your specific project.",
  },
  {
    number: "3",
    title: "Send to Your Client",
    description:
      "Copy, download as PDF, or share directly with your client for approval.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Win More Clients.
              <br />
              Lose Less Money.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              ScopeKit generates professional proposals, scope of work documents
              and invoices in seconds using AI. Free to start.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="bg-[#2563EB] text-white px-7 py-3.5 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-150 text-center"
              >
                Try Free Tools
              </Link>
              <Link
                href="#how-it-works"
                className="border border-[#E2E8F0] text-[#0F172A] px-7 py-3.5 rounded-lg text-base font-medium hover:bg-[#F8FAFC] transition-colors duration-150 text-center"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] text-center tracking-tight">
            Free AI Tools for Freelancers
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {tools.map((tool, i) => (
              <div
                key={tool.href}
                className={`bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200 lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""} ${i === 4 ? "lg:col-start-4" : ""}`}
              >
                <h3 className="text-[#0F172A] font-semibold text-lg">
                  {tool.name}
                </h3>
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
          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="text-[#2563EB] text-sm font-medium hover:underline"
            >
              View All Free Tools →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] text-center tracking-tight">
            How It Works
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {step.number}
                </div>
                <h3 className="text-[#0F172A] font-semibold text-lg">
                  {step.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Ready to stop losing clients to bad proposals?
            </h2>
            <p className="mt-4 text-lg text-[#64748B]">
              Join thousands of freelancers who use ScopeKit to win more work.
            </p>
            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-block bg-[#2563EB] text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors duration-150"
              >
                Get Started Free — It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

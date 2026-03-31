import type { Metadata } from "next";
import WebsiteSOWForm from "./WebsiteSOWForm";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Website Scope of Work Generator — Free AI Tool | ScopeKit",
  description:
    "Generate a professional website scope of work document in seconds using AI. Free, no signup required. Used by thousands of freelancers and web designers.",
};

export default function WebsiteSOWPage() {
  return (
    <div className="bg-white min-h-screen">
      <TopBanner />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Website Scope of Work Generator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Generate a professional scope of work document for any website
            project in seconds. Free, no signup required.
          </p>
        </div>

        {/* Form + Output */}
        <div className="space-y-8">
          <WebsiteSOWForm />
        </div>

        {/* SEO Content */}
        <div className="mt-20 prose-custom">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What Is a Website Scope of Work Document?
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            A website scope of work (SOW) is a formal document that defines
            exactly what work will be performed between a freelancer or web
            design agency and a client. It sets expectations upfront: what pages
            will be built, what features will be included, how long the project
            will take, and how many rounds of revisions are covered by the
            agreed price.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Without a clear scope of work, web design projects spiral out of
            control. Clients ask for "just one more page" or "a small tweak"
            that turns into days of unpaid work. A signed SOW is the single most
            effective tool a freelance web designer can use to prevent scope
            creep and protect their income.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Why Freelancers Need a Website SOW
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Freelance web designers lose thousands of dollars every year to
            scope creep — unplanned extra work that was never agreed upon and
            never paid for. A professional scope of work document solves this
            by:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "Clearly defining what is included in the project — and what is not",
              "Setting a firm timeline so both parties know when work will be delivered",
              "Establishing how many revision rounds are included before additional charges apply",
              "Creating a paper trail that protects you if a client disputes what was agreed",
              "Making you look more professional than 90% of freelancers who just send a quote in an email",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-[#64748B]">
                <span className="text-[#2563EB] font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What to Include in a Website Scope of Work
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-6">
            A complete website scope of work document should cover seven key
            areas:
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            1. Project Overview
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            A brief summary of the project, the client, and the freelancer or
            agency performing the work. This section confirms the parties
            involved and the general nature of the engagement.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            2. Scope of Work
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            The detailed list of what work will be done. For a website project
            this typically includes: design mockups, number of pages, specific
            functionality (contact forms, e-commerce, booking systems), and
            whether the work includes copywriting or just the design and
            development.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            3. Deliverables
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            A numbered list of exactly what the client will receive at the end
            of the project. For example: "A fully functional 7-page website
            built on WordPress, including homepage, about, services, portfolio,
            blog, contact, and 404 page."
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            4. Timeline
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Project milestones with dates. Breaking the project into phases
            (discovery, design, development, review, launch) makes it easy for
            both parties to track progress and hold each other accountable.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            5. Revision Policy
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            This is arguably the most important section for preventing scope
            creep. Clearly state how many rounds of revisions are included, what
            constitutes a "revision" versus new work, and what the hourly rate
            will be for additional changes beyond the included rounds.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            6. Payment Terms
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            The payment schedule — typically 50% upfront and 50% on delivery for
            smaller projects, or milestone-based payments for larger ones.
            Include your accepted payment methods and the timeline for invoices
            to be paid.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            7. Acceptance
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            A signature block where both parties sign and date the document,
            confirming they have read and agreed to the scope. Even a digital
            signature or email confirmation is enough to make this document
            enforceable.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Use This Free Website SOW Generator
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Fill out the form above with your project details — the client name,
            project type, deliverables, timeline, and your contact information.
            Click Generate and Claude AI will write a complete, professional
            scope of work document in seconds. You can copy it to your clipboard
            or download it as a PDF to send directly to your client.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Want to take it further? ScopeKit Pro lets you save every document
            you generate, share a live proposal link your client can approve
            with one click, and track which invoices are paid and unpaid — all
            for $29/month. Try it free for 14 days.
          </p>
        </div>
      </div>
    </div>
  );
}

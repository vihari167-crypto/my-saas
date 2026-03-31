import type { Metadata } from "next";
import FreelanceProposalForm from "./FreelanceProposalForm";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Freelance Proposal Generator — Free AI Tool | ScopeKit",
  description:
    "Generate a professional freelance proposal in seconds using AI. Free freelance proposal template for designers, developers, consultants and more. No signup required.",
};

export default function FreelanceProposalPage() {
  return (
    <div className="bg-white min-h-screen">
      <TopBanner />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Freelance Proposal Generator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Generate a professional, persuasive proposal for any freelance
            project in seconds. Free, no signup required. Edit the result
            directly before sending.
          </p>
        </div>

        {/* Form + Output */}
        <div className="space-y-8">
          <FreelanceProposalForm />
        </div>

        {/* SEO Content */}
        <div className="mt-20">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What Is a Freelance Proposal Template?
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            A freelance proposal template is a structured document that
            freelancers send to potential clients before starting a project. It
            outlines who you are, what you understand about the client&apos;s
            needs, what you&apos;re proposing to do, how long it will take, and
            what it will cost. A well-written proposal is often the difference
            between winning a project and losing it to a competitor.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            This free AI freelance proposal generator creates a complete,
            professional proposal tailored to your specific project in under 10
            seconds. It works for any type of freelance work — graphic design,
            web development, photography, consulting, copywriting, and more.
            Fill in your details, generate the proposal, edit it directly in
            the browser, and download as a PDF to send to your client.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Why Your Freelance Proposal Is Losing You Clients
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Most freelancers lose projects not because of their skills or their
            price, but because of how they present themselves. A quick email
            with a price and a timeline signals that you&apos;re a commodity. A
            structured proposal that demonstrates you understand the
            client&apos;s problem, have a clear plan to solve it, and know
            exactly what you&apos;re delivering — that signals a professional
            worth hiring.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Research consistently shows that freelancers who send a formal
            proposal win projects at a higher rate than those who just quote a
            price. The proposal itself communicates competence before you&apos;ve
            done a single hour of work.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            The Proposal Is Also a Scope of Work
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            A good freelance proposal doesn&apos;t just win the project — it
            protects you once the work begins. By clearly defining deliverables,
            timeline, revision rounds, and payment terms in the proposal itself,
            you set expectations upfront. When a client later asks for
            &quot;just one more thing,&quot; you can point back to what was
            agreed. The proposal becomes your first line of defense against
            scope creep.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What to Include in a Freelance Proposal
          </h2>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Introduction
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            A brief, warm opening that introduces you and acknowledges the
            client&apos;s project. Keep it personal — use the client&apos;s
            name and reference something specific about their business or goal.
            This shows you actually read their brief rather than sending a
            generic template.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Understanding of Their Needs
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Restate the client&apos;s problem in your own words. This is the
            most important section for building trust. When clients read a
            proposal and feel truly understood, they are far more likely to
            hire you. It proves you listened, thought about their situation, and
            aren&apos;t just copy-pasting a standard pitch.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Proposed Solution and Deliverables
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Describe exactly what you&apos;ll do and what the client will
            receive. Be concrete. Not &quot;a new website&quot; but &quot;a
            6-page WordPress site, mobile-responsive, with an integrated contact
            form and SEO-optimized meta tags.&quot; Specific deliverables
            eliminate ambiguity and reduce disputes later.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Timeline and Investment
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Break the project into phases with milestones and dates. Clients
            appreciate knowing when they can expect progress. For pricing, be
            direct — present the total investment clearly and, where it makes
            sense, break it into a payment schedule (e.g. 50% upfront, 50% on
            delivery). Vague pricing makes clients nervous.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Next Steps
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Always end with a clear call to action. Tell the client exactly what
            to do next — reply to confirm, sign and return the document, or make
            the deposit. Proposals without a clear next step tend to sit in
            inboxes. Make it easy for the client to say yes.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Use This Free Freelance Proposal Generator
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Fill out the form above with your details, the client&apos;s
            details, and the project information. Be specific in the
            &quot;What does the client need?&quot; and &quot;Your proposed
            solution&quot; fields — the more detail you provide, the more
            tailored and persuasive the generated proposal will be. Click
            Generate and Claude AI writes a complete proposal in seconds. You
            can click into any section and edit the text directly before
            downloading as a PDF.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Want to send your proposal as a live link that your client can
            approve with one click? ScopeKit Pro lets you do exactly that —
            plus save all your documents, manage clients, and track unpaid
            invoices. Try it free for 14 days, $29/month after.
          </p>
        </div>
      </div>
    </div>
  );
}

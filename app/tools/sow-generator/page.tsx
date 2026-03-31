import type { Metadata } from "next";
import GeneralSOWForm from "./GeneralSOWForm";

export const metadata: Metadata = {
  title: "Scope of Work Generator — Free AI Tool | ScopeKit",
  description:
    "Free AI scope of work generator for any industry. Create a professional SOW document in seconds — plumbing, photography, consulting, design, and more. No signup required.",
};

export default function SOWGeneratorPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Scope of Work Generator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Generate a professional scope of work document for any industry in
            seconds. Free, no signup required. Edit the result directly before
            downloading.
          </p>
        </div>

        {/* Form + Output */}
        <div className="space-y-8">
          <GeneralSOWForm />
        </div>

        {/* SEO Content */}
        <div className="mt-20">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What Is a Scope of Work Generator?
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            A scope of work generator is a tool that creates a professional
            project agreement document in seconds, based on the details of your
            specific job. Instead of starting from a blank page or searching for
            a template that almost-fits your situation, a scope of work
            generator uses AI to write a document that's tailored exactly to
            your project, your client, and your industry.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            This free scope of work generator works for any type of freelance or
            contract work — from plumbers and electricians to graphic designers,
            photographers, consultants, landscapers, and web developers. Fill in
            your project details and get a complete, professional document in
            under 10 seconds.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Why Every Freelancer Needs a Scope of Work
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            A scope of work (SOW) is the single most important document in any
            freelance or contractor relationship. It defines exactly what work
            you&apos;ll do, what you won&apos;t do, how long it will take, how
            many changes are included, and when payment is due. Without it,
            you&apos;re working on a handshake — and handshakes don&apos;t hold
            up when a client asks for five extra revisions or decides the
            "small" project is actually twice the work you agreed to.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Freelancers who use a signed scope of work document report fewer
            disputes, faster payments, and more professional client
            relationships. It also makes you stand out — most freelancers
            competing for the same work don&apos;t send a formal SOW. Sending
            one signals that you&apos;re serious, experienced, and worth the
            price.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Scope of Work vs. Contract — What&apos;s the Difference?
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            A scope of work is a detailed description of the work to be
            performed — the what, when, and how much. A contract is the legal
            agreement that governs the relationship. In practice, many
            freelancers use an SOW as their contract, especially for smaller
            projects. When both parties sign or formally acknowledge the scope
            of work, it becomes a binding agreement. For larger projects, the
            SOW is often attached to a broader contract.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What a Good Scope of Work Document Includes
          </h2>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Project Overview
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            A brief summary of the project and the parties involved — who is
            doing the work, who is the client, and what the project is about.
            This section sets the context for everything that follows.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Scope of Work
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            The detailed description of exactly what work will be performed.
            This is the heart of the document. It should be specific enough
            that both parties have the same understanding of what&apos;s
            included — and what&apos;s not. &quot;Not included&quot; language
            is just as important as what is included.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Deliverables
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            A numbered list of the tangible outputs the client will receive at
            the end of the project. Deliverables should be concrete and
            measurable. Not &quot;a clean website&quot; but &quot;a 6-page
            website built on WordPress, mobile-responsive, with contact
            form.&quot;
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Timeline
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            The project schedule with milestones and deadlines. Breaking a
            project into phases helps both you and your client track progress
            and holds both parties accountable to their commitments — including
            the client&apos;s commitment to provide feedback and approvals on
            time.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Revision Policy and Payment Terms
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            These two sections are where most freelancers lose money when they
            skip the scope of work. The revision policy defines how many rounds
            of changes are included and what happens when the client wants more.
            The payment terms define the schedule, method, and consequences of
            late payment. Get these in writing before starting any work.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Use This Scope of Work Generator
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Fill out the form above with your project details. Type your
            industry or type of work in plain language — the AI will adapt the
            document to your specific field. After clicking Generate, you
            get a complete scope of work document written specifically for your
            project. You can then click into any section of the document and
            edit it directly before copying or downloading as a PDF.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            For freelancers who want to go further — save documents, share a
            live proposal link your client can approve online, and track which
            invoices are paid — ScopeKit Pro is $29/month. Try it free for 14
            days.
          </p>
        </div>
      </div>
    </div>
  );
}

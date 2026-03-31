import type { Metadata } from "next";
import ScopeCreepCalculatorForm from "./ScopeCreepCalculatorForm";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Scope Creep Cost Calculator — Free Tool | ScopeKit",
  description:
    "Calculate exactly how much scope creep is costing you. Enter your extra hours, unplanned revisions, and unbilled meetings to see the real dollar amount you're losing per project.",
};

export default function ScopeCreepCalculatorPage() {
  return (
    <div className="bg-white min-h-screen">
      <TopBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Scope Creep Cost Calculator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Find out exactly how much money unplanned extra work is costing you.
            Enter your project details and see the real dollar amount you
            worked for free.
          </p>
        </div>

        {/* Calculator */}
        <ScopeCreepCalculatorForm />

        {/* SEO Content */}
        <div className="max-w-3xl mt-20">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What Is Scope Creep and Why Does It Cost So Much?
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Scope creep is the gradual expansion of a project beyond its
            original agreed boundaries — and it is one of the most costly and
            underestimated problems in freelancing. It rarely announces itself.
            It shows up as a quick request to &quot;just tweak one more
            thing,&quot; an extra revision round that wasn&apos;t in the
            agreement, a call that runs two hours longer than planned, or a
            new feature added mid-project without any conversation about
            additional cost.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            The scope creep cost accumulates invisibly. Each individual addition
            feels small enough to absorb. But by the end of a project,
            freelancers regularly discover they have worked 30%, 50%, even
            100% more hours than they originally quoted — without receiving a
            dollar of additional compensation. This scope creep calculator
            makes those costs visible by translating unbilled hours into the
            exact dollar amount they represent at your hourly rate.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            The Hidden Forms of Scope Creep
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Most freelancers think of scope creep only as extra deliverables —
            a client asking for an additional page, an extra logo concept, or a
            feature that wasn&apos;t in the original brief. But scope creep
            takes many forms, and the less obvious ones often cost more in
            aggregate.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Revision Creep
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Most project agreements include a specified number of revision
            rounds. When clients request a third round when the contract said
            two, or a fifth when the contract said three, that extra work is
            effectively being provided for free. Revision rounds can easily
            consume two to four hours each, and freelancers who routinely
            absorb extra revision requests often lose thousands of dollars per
            year this way without realizing it.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Meeting Creep
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Unplanned calls and check-ins are one of the most insidious forms
            of scope creep because they feel like relationship-building rather
            than billable work. A 30-minute call that turns into 90 minutes,
            an impromptu &quot;quick sync&quot; that happens every week —
            these add up to real hours at your real rate. If your project
            agreement doesn&apos;t specify the number and duration of included
            meetings, clients have no reason not to schedule them freely.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Change-of-Direction Creep
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Sometimes a client doesn&apos;t add new work — they change the
            direction of existing work mid-stream. Asking to &quot;pivot the
            concept&quot; or &quot;start fresh in a different direction&quot;
            after substantial work has been done invalidates hours of completed
            work and requires starting again. Without clear language in your
            scope of work about what happens when a client-initiated direction
            change occurs, you absorb the full cost.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Prevent Scope Creep Before It Starts
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            The most effective way to prevent scope creep is to define the
            scope precisely before work begins. A well-written scope of work
            document specifies exactly what is included, exactly what is not
            included, how many revision rounds are covered, what constitutes a
            revision versus a new request, and what the process is for handling
            changes that fall outside the agreed scope.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            When a client makes a request that falls outside the defined scope,
            the conversation becomes simple: &quot;That&apos;s outside our
            agreed scope — I can provide a quote for that as a separate piece
            of work.&quot; This is not an awkward conversation when you have a
            document to point to. The scope of work transforms a vague
            agreement into a clear contract that protects both parties.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Similarly, a clear revision policy in your agreement — stating that
            the project includes two rounds of revisions, with additional rounds
            billed at your hourly rate — removes ambiguity and gives you a
            professional basis for charging for extra revision requests.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            ScopeKit&apos;s free scope of work generator creates a detailed,
            professional SOW for any project in seconds. ScopeKit Pro adds
            client-approved e-signatures, saved documents, and change order
            tracking — making scope protection automatic. Try it free for 14
            days, $29/month after.
          </p>
        </div>
      </div>
    </div>
  );
}

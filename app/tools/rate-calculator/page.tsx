import type { Metadata } from "next";
import RateCalculatorForm from "./RateCalculatorForm";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Freelance Rate Calculator — Free Tool | ScopeKit",
  description:
    "Calculate exactly what hourly rate you should charge as a freelancer. Free freelance rate calculator — enter your expenses, taxes, and work schedule to find your minimum and recommended rate.",
};

export default function RateCalculatorPage() {
  return (
    <div className="bg-white min-h-screen">
      <TopBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Freelance Rate Calculator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Enter your real expenses and work schedule to find out exactly what
            you need to charge. No guessing — just math.
          </p>
        </div>

        {/* Calculator */}
        <RateCalculatorForm />

        {/* SEO Content */}
        <div className="max-w-3xl mt-20">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Why You Need a Freelance Rate Calculator
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            One of the most common mistakes new freelancers make is picking a
            rate based on what feels reasonable, what a friend charges, or what
            they see on job boards — rather than what they actually need to
            survive and thrive. A freelance rate calculator forces you to work
            backwards from your real financial needs to arrive at a number
            grounded in math, not guesswork.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            The consequences of undercharging compound over time. A rate that
            feels fine in month one starts to feel unsustainable by month six
            when you realize you&apos;re working full-time hours but taking home
            less than an entry-level salary. This calculator is designed to
            prevent that by making all of your costs visible and calculating the
            minimum viable rate you need to stay in business — then adding a
            buffer for the inevitable gaps between projects.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Calculate Your Freelance Hourly Rate
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            The correct way to calculate a freelance hourly rate starts with
            your total monthly cost of living — rent, food, transport,
            subscriptions, and other personal expenses. To that, you add your
            business-specific costs: health insurance, software, equipment, and
            any other overhead that comes with operating as a self-employed
            professional. Then you add the amount of profit you want to take
            beyond just covering expenses. This is your target monthly take-home.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            The next step most freelancers miss is grossing up for taxes.
            Unlike a salaried employee who gets tax withheld automatically,
            freelancers pay self-employment tax on top of income tax. In the US,
            that typically means setting aside 25–35% of gross income. Your
            calculator needs to account for this, so it adds taxes back to
            arrive at the gross income you need to earn before any taxes are
            taken out.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Why Billable Hours Are Less Than You Think
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            If you work 40 hours a week, you cannot bill 40 hours a week.
            A significant portion of every freelancer&apos;s time goes to
            non-billable activities: responding to emails, writing proposals,
            updating invoices, marketing yourself, networking, professional
            development, and administrative tasks. A realistic billable
            percentage is between 60% and 75% for most freelancers. This
            calculator uses your billable percentage and your weeks worked per
            year to calculate your actual annual billable hours — the real
            denominator when dividing your income need by your available hours.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            The 20% Buffer Rule
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            The minimum hourly rate tells you the floor — the number below
            which you cannot survive. But experienced freelancers universally
            recommend charging above the minimum for several reasons. First,
            you will not be fully booked every single week of the year. There
            will be gaps between projects, slow months, and time spent finding
            new clients. Second, unexpected expenses occur — equipment breaks,
            clients delay payment, projects get cancelled. A 20% buffer on top
            of your minimum gives you a cushion to absorb these realities
            without financial stress.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            This is why the calculator shows both a minimum rate and a
            recommended rate. The recommended rate is your minimum plus 20%.
            This is not padding — it is responsible financial planning for a
            variable-income career.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Using Your Rate for Project-Based Pricing
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Once you know your hourly rate, you can price any project by
            estimating how many billable hours it will take. The calculator
            shows you example project rates for one-week, two-week, and
            one-month engagements based on your billable hours per week. These
            are starting points — actual project quotes should be adjusted for
            scope, complexity, and client context.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Many experienced freelancers shift from hourly to project-based
            pricing over time. Project-based pricing rewards efficiency — if you
            can complete a $3,000 project in five hours instead of ten, you
            earned $600/hr in effective terms. But your project prices should
            always be anchored to your hourly rate calculation to ensure you
            never accidentally undercharge.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Ready to put your rate to work? ScopeKit&apos;s free proposal
            generator, scope of work generator, and invoice generator let you
            create professional client documents at your calculated rate in
            seconds. ScopeKit Pro adds client management, document sharing, and
            invoice tracking. Try it free for 14 days, $29/month after.
          </p>
        </div>
      </div>
    </div>
  );
}

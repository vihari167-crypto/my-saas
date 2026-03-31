import type { Metadata } from "next";
import InvoiceGeneratorForm from "./InvoiceGeneratorForm";

export const metadata: Metadata = {
  title: "Freelance Invoice Generator — Free AI Tool | ScopeKit",
  description:
    "Create a professional freelance invoice in seconds. Free invoice generator for freelancers, consultants, and small businesses. No signup required. Download as PDF instantly.",
};

export default function InvoiceGeneratorPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Freelance Invoice Generator
          </h1>
          <p className="mt-3 text-[#64748B] text-lg leading-relaxed">
            Create a professional invoice for any freelance project in seconds.
            Free, no signup required. Fill in your details and download as a
            PDF to send to your client.
          </p>
        </div>

        {/* Form + Live Preview */}
        <InvoiceGeneratorForm />

        {/* SEO Content */}
        <div className="max-w-3xl mt-20">
          <hr className="border-[#E2E8F0] mb-12" />

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What Is a Freelance Invoice Template?
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            A freelance invoice template is a structured billing document that
            freelancers send to clients to request payment for completed work.
            It itemizes the services provided, the agreed-upon rates, and the
            total amount owed — giving both parties a clear, professional record
            of the transaction. Unlike a simple email asking for payment, a
            proper invoice creates a paper trail, establishes payment terms, and
            communicates that you run your freelance business professionally.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            This free freelance invoice generator creates a complete,
            professionally formatted invoice from your details in seconds. It
            handles multiple line items, automatic calculations, tax, and
            generates a print-ready PDF you can send directly to your client.
            It works for any type of freelance work — design, development,
            writing, consulting, photography, and more.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Why Every Freelancer Needs a Professional Invoice
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Most freelancers underestimate how much a professional invoice
            matters. Sending a vague PayPal request or a casual email with a
            dollar amount signals informality — and informal payment requests get
            deprioritized in a client&apos;s inbox. A properly formatted invoice
            with your business name, an invoice number, clear line items, and a
            stated due date signals that you&apos;re serious about getting paid
            on time.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Beyond professionalism, invoices provide legal and financial
            protection. If a payment dispute ever arises, a signed or sent
            invoice serves as evidence of the agreed work and amount. For tax
            purposes, a consistent record of invoices makes bookkeeping
            dramatically easier at year-end. Many freelancers operating without
            a proper invoicing system find themselves scrambling to reconstruct
            their income history — a problem that&apos;s entirely avoidable.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Invoice Numbers Matter More Than You Think
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            One of the most overlooked details on a freelance invoice template
            is the invoice number. Assigning sequential invoice numbers (INV-001,
            INV-002, etc.) does more than look professional — it gives both you
            and your client an easy reference point for every transaction. When
            a client asks &quot;which payment is this for?&quot; or your
            accountant asks about a specific transaction, the invoice number is
            the fastest way to find it. Start numbering from your very first
            invoice and never skip a number.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            What to Include on a Freelance Invoice
          </h2>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Your Business Information
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Include your full name or business name, your email address, and
            your mailing address if applicable. This identifies who is requesting
            payment and ensures the client can contact you if they have questions
            about the invoice.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Client Information
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Include the client&apos;s full name, their company name, and their
            email address. This &quot;Bill To&quot; section confirms who the
            invoice is addressed to and is important for the client&apos;s own
            accounting records.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Invoice Date and Due Date
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            The invoice date is when you issued the invoice. The due date is
            when you expect to be paid. Net 30 (30 days from invoice date) is the
            most common standard, but many freelancers use Net 14 or even Net 7
            for faster payment. Always state the due date explicitly — open-ended
            payment requests result in indefinite delays.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Itemized Line Items
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-5">
            Break down your work into individual line items with a description,
            quantity, and rate. Being specific here prevents disputes — instead
            of &quot;Design work — $1,500,&quot; write &quot;Logo design (3
            concepts + 2 revision rounds) — $1,500.&quot; If you charge hourly,
            list the hours and your hourly rate separately. Transparent line
            items build trust and reduce the chance of clients questioning the
            total.
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Subtotal, Tax, and Total
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Show the subtotal before tax, the tax amount (if applicable), and
            the final total clearly. If you&apos;re required to charge sales tax
            or VAT based on your location or your client&apos;s location, include
            the tax rate. When in doubt, consult a local accountant about your
            tax obligations as a freelancer.
          </p>

          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Use This Free Freelance Invoice Generator
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">
            Fill in your details in the form — your business information, your
            client&apos;s details, the invoice number and dates, and your line
            items. The invoice preview updates live as you type. You can add as
            many line items as needed. Click Download PDF to get a print-ready
            file you can send to your client.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Want to track which invoices have been paid, send automated payment
            reminders, and manage all your clients in one place? ScopeKit Pro
            gives you all of that — plus proposal and SOW generation, document
            sharing, and client approval tracking. Try it free for 14 days,
            $29/month after.
          </p>
        </div>
      </div>
    </div>
  );
}

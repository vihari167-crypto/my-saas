import Link from "next/link";

export default function TopBanner() {
  return (
    <Link
      href="/signup"
      className="sticky top-16 z-40 flex items-center justify-center w-full bg-[#2563EB] hover:bg-blue-700 transition-colors duration-150 px-4 py-2.5 text-white text-sm font-medium text-center"
    >
      ScopeKit Pro is coming soon — save your documents, track invoices, manage
      clients.{" "}
      <span className="ml-1.5 underline underline-offset-2 whitespace-nowrap">
        Join the waitlist →
      </span>
    </Link>
  );
}

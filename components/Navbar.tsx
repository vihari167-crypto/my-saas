import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-[#0F172A] font-bold text-xl tracking-tight"
          >
            ScopeKit
          </Link>
          <Link
            href="/signup"
            className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-150"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}

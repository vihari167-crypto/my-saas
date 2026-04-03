import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#0F172A] font-bold text-xl tracking-tight"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#2563EB"/>
              <path d="M8 4H17L21 8V24H8V4Z" fill="white"/>
              <path d="M17 4L21 8H17V4Z" fill="#BFDBFE"/>
              <path d="M11 15.5L13.5 18L17.5 13" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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

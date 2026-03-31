export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[#0F172A] font-bold text-lg tracking-tight">
            ScopeKit
          </span>
          <p className="text-[#64748B] text-sm">
            Win more clients. Lose less money.
          </p>
          <p className="text-[#94A3B8] text-xs mt-3">
            © {new Date().getFullYear()} ScopeKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

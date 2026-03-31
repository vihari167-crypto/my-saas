import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-3">
          This page doesn&apos;t exist
        </h1>
        <p className="text-[#64748B] text-base mb-8">
          The page you&apos;re looking for has moved or never existed.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#2563EB] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

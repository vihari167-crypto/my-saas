"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  "Save unlimited proposals and SOWs to your account",
  "Send proposals to clients for one-click approval",
  "Track invoices and get paid faster",
  "Manage all your clients in one place",
];

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "f9c05c52-7af9-42b4-aec5-3d2ea21844fe",
          email,
          feedback,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Value proposition ── */}
          <div>
            <p className="text-[#2563EB] text-sm font-semibold uppercase tracking-widest mb-4">
              ScopeKit Pro — Coming Soon
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Be First to Access
              <br />
              ScopeKit Pro
            </h1>
            <p className="mt-6 text-[#64748B] text-lg leading-relaxed">
              ScopeKit Pro gives freelancers one place to save proposals, send
              scope of work documents for client approval, create and track
              invoices, and manage every client relationship — all AI-powered.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4l2.5 2.5L9 1"
                        stroke="#2563EB"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[#374151] text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 inline-flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1a6 6 0 100 12A6 6 0 007 1zM7 4v3.5l2 1"
                  stroke="#64748B"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-[#64748B]">
                Launching soon at{" "}
                <span className="font-semibold text-[#0F172A]">$29/month.</span>{" "}
                Join the waitlist for{" "}
                <span className="font-semibold text-[#0F172A]">
                  early access pricing — locked in for life.
                </span>
              </span>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-8 sm:p-10">
              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D1FAE5] text-[#059669] mb-5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10l4 4 8-8"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-2">
                    You&apos;re on the list!
                  </h2>
                  <p className="text-[#64748B] text-sm">
                    We&apos;ll email you the moment we launch.
                  </p>
                  <div className="mt-8 pt-6 border-t border-[#F1F5F9]">
                    <p className="text-sm text-[#64748B] mb-4">
                      Explore the free tools while you wait
                    </p>
                    <Link
                      href="/tools"
                      className="inline-block bg-[#2563EB] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150"
                    >
                      Browse Free Tools →
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-1">
                    Join the waitlist
                  </h2>
                  <p className="text-sm text-[#64748B] mb-6">
                    No spam. We&apos;ll only email you when we launch.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#0F172A] mb-1.5"
                      >
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-[#0F172A] mb-1.5"
                      >
                        What would make ScopeKit Pro perfect for you?{" "}
                        <span className="text-[#94A3B8] font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="feedback"
                        rows={3}
                        placeholder="e.g. Better invoice tracking, recurring client templates…"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-shadow resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[#2563EB] text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Joining…" : "Join Waitlist"}
                    </button>
                  </form>

                  <p className="mt-4 text-xs text-[#94A3B8] text-center">
                    Free tools available right now —{" "}
                    <Link
                      href="/tools"
                      className="text-[#2563EB] hover:underline"
                    >
                      no signup needed
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

import PageShell from "@/components/PageShell";
import { toast } from "@/lib/toast";
import { authApi } from "@/lib/api";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authApi.forgotPassword(email);
      if (data.success) {
        setDone(true);
        toast.success(data.message || "Reset link sent");
      } else {
        setError(data.message || "Failed to send reset link");
      }
    } catch (err) {
      setError(err.message || "Error sending reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell contentClassName="flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="glass-card w-full max-w-md p-8"
      >
        <h1 className="text-center font-display text-2xl font-bold text-white">Reset your password</h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your account email and we&apos;ll send you a secure reset link.
        </p>

        {done ? (
          <div className="mt-8 space-y-6 text-center">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              If that email exists, a password reset link has been sent. It expires in 1 hour.
            </div>
            <Link href="/login" className="btn-primary w-full justify-center">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="input-label"><FaEnvelope /> Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-300">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Sending…" : "Send reset link"}
            </button>

            <p className="text-center text-sm text-slate-400">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-indigo-300 hover:text-indigo-200">
                Log in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </PageShell>
  );
}

"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

import PageShell from "@/components/PageShell";
import { toast } from "@/lib/toast";
import { authApi } from "@/lib/api";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!token) {
      return setError("This reset link is invalid. Please request a new one.");
    }
    if (newPassword.length < 6) {
      return setError("New password must be at least 6 characters");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    try {
      const data = await authApi.resetPassword(token, newPassword);
      if (data.success) {
        toast.success(data.message || "Password updated");
        router.replace("/login");
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.message || "Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass-card w-full max-w-md p-8"
    >
      <h1 className="text-center font-display text-2xl font-bold text-white">Set a new password</h1>
      <p className="mt-2 text-center text-sm text-slate-400">
        Choose a strong password for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="input-label"><FaLock /> New password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            className="input-field"
            placeholder="At least 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="input-label"><FaLock /> Confirm new password</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            className="input-field"
            placeholder="Repeat the new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-center text-sm text-rose-300">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Updating…" : "Update password"}
        </button>

        <p className="text-center text-sm text-slate-400">
          <Link href="/forgot-password" className="font-medium text-indigo-300 hover:text-indigo-200">
            Request a new reset link
          </Link>
        </p>
      </form>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <PageShell contentClassName="flex min-h-screen items-center justify-center px-4 py-16">
      <Suspense fallback={<span className="text-slate-400">Loading…</span>}>
        <ResetPasswordForm />
      </Suspense>
    </PageShell>
  );
}

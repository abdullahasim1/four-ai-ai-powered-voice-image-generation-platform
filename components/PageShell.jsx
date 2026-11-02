"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHistory } from "react-icons/fa";

/**
 * Shared page shell: soft lavender mesh background + entrance motion.
 * Keeps every page visually consistent in light and dark themes.
 */
export default function PageShell({ icons, children, className = "", contentClassName = "" }) {
  return (
    <div className={`page-shell relative min-h-screen overflow-hidden ${className}`}>
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />
      {icons && (
        <div className="absolute inset-0">
          {icons}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative z-10 ${contentClassName}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h1 className="section-title flex items-center justify-center gap-3">
        {icon}
        <span>{title}</span>
      </h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

/**
 * Board-style tool header: back arrow, gradient icon chip, title +
 * subtitle on the left, and a History shortcut on the right.
 */
export function ToolHeader({ icon, title, subtitle, backHref = "/dashboard" }) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
      <Link
        href={backHref}
        aria-label="Back to dashboard"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface t-muted transition-colors hover:text-[var(--primary)]"
      >
        <FaArrowLeft className="text-sm" />
      </Link>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xl text-white shadow-lg shadow-violet-500/25">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-2xl font-bold tracking-tight t-text">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm t-muted">{subtitle}</p>}
      </div>
      <Link href="/history" className="pill-tab flex items-center gap-2 border-line bg-surface">
        <FaHistory /> History
      </Link>
    </div>
  );
}

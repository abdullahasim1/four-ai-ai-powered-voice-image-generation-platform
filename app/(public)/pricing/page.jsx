"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FiBriefcase, FiStar, FiZap } from "react-icons/fi";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import { getSession } from "@/lib/auth-client";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    tagline: "For trying things out",
    icon: <FiStar className="text-2xl" />,
    popular: false,
    cta: "Get Started Free",
    features: [
      "Limited generations",
      "Standard quality",
      "Basic voice models & effects",
      "Community support",
    ],
  },
  {
    name: "Pro",
    monthly: 9,
    tagline: "For serious creators",
    icon: <FiZap className="text-2xl" />,
    popular: true,
    cta: "Upgrade to Pro",
    features: [
      "Higher generation limits",
      "Premium voices",
      "Faster processing",
      "HD image generation",
      "Priority support",
    ],
  },
  {
    name: "Business",
    monthly: 29,
    tagline: "For teams & studios",
    icon: <FiBriefcase className="text-2xl" />,
    popular: false,
    cta: "Contact Sales",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Highest priority queue",
      "Commercial use",
      "API access",
      "Dedicated support",
    ],
  },
];

export default function Pricing() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getSession()));
  }, []);

  const priceFor = (plan) =>
    yearly ? (plan.monthly * 0.8).toFixed(plan.monthly === 0 ? 0 : 2) : plan.monthly;

  return (
    <PageShell contentClassName="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <span className="badge mx-auto">Pricing</span>
        <h1 className="mt-4 section-title">Simple, transparent pricing</h1>
        <p className="section-subtitle">
          Start free and upgrade when you need more power. Cancel anytime.
        </p>

        {/* Monthly / Yearly toggle (board layout) */}
        <div className="mt-8 inline-flex items-center rounded-full border border-line bg-surface p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              !yearly ? "bg-[var(--primary)] text-white shadow" : "t-muted hover:t-text"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              yearly ? "bg-[var(--primary)] text-white shadow" : "t-muted hover:t-text"
            }`}
          >
            Yearly{" "}
            <span className={`text-xs font-bold ${yearly ? "text-emerald-200" : "text-emerald-500"}`}>
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className={
              plan.popular
                ? "relative flex flex-col overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-violet-600 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-600/30 md:-my-3 md:py-11"
                : "glass-card card-hover relative flex flex-col p-8"
            }
          >
            {plan.popular && (
              <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                Most Popular
              </span>
            )}

            <div>
              <span
                className={`inline-flex rounded-xl p-3.5 ${
                  plan.popular ? "bg-white/20 text-white" : "bg-[var(--primary-soft)] text-[var(--primary)]"
                }`}
              >
                {plan.icon}
              </span>
              <h3 className={`mt-4 font-display text-xl font-bold ${plan.popular ? "text-white" : "t-text"}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.popular ? "text-violet-100" : "t-muted"}`}>{plan.tagline}</p>
              <p className="mt-5 flex items-end gap-1">
                <span className={`font-display text-[2.6rem] font-extrabold leading-none ${plan.popular ? "text-white" : "t-text"}`}>
                  ${priceFor(plan)}
                </span>
                <span className={`pb-1 text-sm ${plan.popular ? "text-violet-100" : "t-muted"}`}>/month</span>
              </p>
              <p className={`mt-1 text-xs ${plan.popular ? "text-violet-200" : "t-faint"}`}>
                {plan.monthly === 0
                  ? "Free forever"
                  : yearly
                    ? `Billed yearly ($${(plan.monthly * 12 * 0.8).toFixed(0)}/year)`
                    : "Billed monthly"}
              </p>
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-violet-50" : "t-2"}`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      plan.popular ? "bg-white/25 text-white" : "bg-[var(--primary-soft)] text-[var(--primary)]"
                    }`}
                  >
                    <FaCheck />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.popular ? (
              <Link
                href={loggedIn ? "/dashboard" : "/signup"}
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {loggedIn ? "Open Dashboard" : plan.cta}
              </Link>
            ) : (
              <Link
                href={loggedIn ? "/dashboard" : "/signup"}
                className="btn-secondary mt-8 w-full justify-center"
              >
                {loggedIn ? "Open Dashboard" : plan.cta}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}

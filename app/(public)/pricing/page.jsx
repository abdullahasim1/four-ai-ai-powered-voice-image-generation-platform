"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaCrown,
  FaHeadphones,
  FaInfinity,
  FaMicrophone,
} from "react-icons/fa";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import { getSession } from "@/lib/auth-client";

const PLANS = [
  {
    name: "Basic",
    price: "$9.99",
    period: "/month",
    tagline: "For trying things out",
    icon: <FaMicrophone className="text-2xl" />,
    popular: false,
    features: [
      "100 voice generations / month",
      "20 AI images / month",
      "Standard quality output",
      "All voice effects",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    tagline: "For serious creators",
    icon: <FaHeadphones className="text-2xl" />,
    popular: true,
    features: [
      "Unlimited generations",
      "High-quality outputs",
      "Priority generation queue",
      "Full usage history sync",
      "WAV downloads",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$49.99",
    period: "/month",
    tagline: "For teams & studios",
    icon: <FaCrown className="text-2xl" />,
    popular: false,
    features: [
      "Everything in Pro",
      "API access with keys",
      "Custom voice training",
      "Team workspaces",
      "Dedicated account manager",
      "99.9% uptime SLA",
    ],
  },
];

export default function Pricing() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getSession()));
  }, []);

  return (
    <PageShell contentClassName="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <span className="badge mx-auto">Pricing</span>
        <h1 className="mt-4 section-title">Choose a plan that fits your creative needs.</h1>
        <p className="section-subtitle">
          Start free and upgrade when you need more power. Cancel anytime.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
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
                className={`inline-flex rounded-xl p-3.5 shadow-lg ${
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
                  {plan.price}
                </span>
                <span className={`pb-1 text-sm ${plan.popular ? "text-violet-100" : "t-muted"}`}>{plan.period}</span>
              </p>
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2.5 text-sm ${plan.popular ? "text-violet-50" : "t-2"}`}
                >
                  <FaCheck className={`mt-1 shrink-0 ${plan.popular ? "text-white" : "text-emerald-500"}`} />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.popular ? (
              <Link
                href={loggedIn ? "/dashboard" : "/signup"}
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {loggedIn ? "Open Dashboard" : `Upgrade to ${plan.name}`}
              </Link>
            ) : (
              <Link
                href={loggedIn ? "/dashboard" : "/signup"}
                className="btn-secondary mt-8 w-full justify-center"
              >
                {loggedIn ? "Open Dashboard" : `Get Started`}
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <p data-reveal className="mx-auto mt-12 flex max-w-md items-center justify-center gap-2 text-center text-xs t-faint">
        <FaInfinity /> All plans include unlimited projects and history tracking.
      </p>
    </PageShell>
  );
}

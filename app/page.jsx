"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
  FaClosedCaptioning,
  FaImage,
  FaInfinity,
  FaMicrophoneAlt,
  FaPlay,
  FaSlidersH,
  FaStar,
  FaUsers,
  FaVolumeUp,
} from "react-icons/fa";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth-client";

const TOOLS = [
  {
    icon: <FaMicrophoneAlt className="text-xl" />,
    title: "Voice Generator",
    text: "Create realistic AI voices in multiple accents.",
    to: "/voice-generator",
  },
  {
    icon: <FaVolumeUp className="text-xl" />,
    title: "Text to Speech",
    text: "Convert text into natural-sounding speech.",
    to: "/text-to-speech",
  },
  {
    icon: <FaSlidersH className="text-xl" />,
    title: "Voice Changer",
    text: "Transform your voice with AI effects.",
    to: "/voicechanger",
  },
  {
    icon: <FaImage className="text-xl" />,
    title: "Image Generator",
    text: "Generate stunning images from text using AI.",
    to: "/imagegenerator",
  },
];

const STATS = [
  { icon: <FaUsers />, value: "10K+", label: "Creations" },
  { icon: <FaBolt />, value: "99.9%", label: "Uptime" },
  { icon: <FaStar />, value: "4.8/5", label: "User Rating" },
  { icon: <FaInfinity />, value: "All-in-One", label: "AI Platform" },
];

const WAVE_HEIGHTS = [10, 18, 26, 14, 30, 22, 34, 18, 28, 12, 24, 32, 16, 26, 20, 30, 14, 22, 28, 18];

/** Decorative sunset-mountain scene (pure SVG, no external assets). */
function SceneArt({ className = "" }) {
  return (
    <svg viewBox="0 0 320 200" className={className} role="img" aria-label="AI generated mountain sunset artwork">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="45%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" />
      <circle cx="218" cy="74" r="26" fill="#fde68a" opacity="0.95" />
      <circle cx="218" cy="74" r="40" fill="#fde68a" opacity="0.25" />
      <path d="M0 150 L70 84 L118 128 L168 66 L232 132 L276 96 L320 140 L320 200 L0 200 Z" fill="url(#mtn)" opacity="0.92" />
      <path d="M0 172 L52 128 L108 162 L178 108 L244 160 L320 122 L320 200 L0 200 Z" fill="#17122e" />
    </svg>
  );
}

export default function Startpage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getSession()));
  }, []);

  const primaryHref = loggedIn ? "/dashboard" : "/signup";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-grow overflow-hidden">
        <div className="mesh-bg absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          {/* ---------- Hero ---------- */}
          <section className="grid items-center gap-14 pb-16 pt-14 lg:grid-cols-2 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge normal-case tracking-normal">
                All-in-One AI Media Suite
              </span>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.08] tracking-tight t-text sm:text-6xl">
                Create Voice &amp; Images with the{" "}
                <span className="gradient-text">Power of AI</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed t-muted">
                Generate realistic voices, convert text to speech, change voices, and create
                stunning images — all in one place.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href={primaryHref} className="btn-primary !px-7 !py-3.5 !text-base">
                  {loggedIn ? "Open Dashboard" : "Start Creating Free"} <FaArrowRight />
                </Link>
                <Link href="#tools" className="btn-secondary !px-7 !py-3.5 !text-base">
                  Explore Tools
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium t-2">
                {["No Credit Card", "Fast Generation", "High Quality"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-[var(--primary)]" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Hero visual collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto hidden aspect-[4/3] w-full max-w-[540px] sm:block"
              aria-hidden="true"
            >
              <div className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-violet-400/25 via-fuchsia-300/15 to-violet-200/10" />
              {/* Mic card */}
              <div className="glass-card absolute left-[16%] top-[2%] flex h-40 w-40 flex-col items-center justify-center !rounded-[2rem]">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-3xl text-white shadow-xl shadow-violet-500/30">
                  <FaMicrophoneAlt />
                </span>
                <span className="mt-3 text-xs font-semibold t-muted">AI Voice</span>
              </div>
              {/* Waveform card */}
              <div className="glass-card absolute left-0 top-[38%] flex w-64 items-center gap-3 !rounded-3xl p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
                  <FaPlay className="ml-0.5 text-xs" />
                </span>
                <span className="flex h-10 flex-1 items-center gap-[3px]">
                  {WAVE_HEIGHTS.map((h, i) => (
                    <span
                      key={i}
                      className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-violet-500 to-fuchsia-400"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.09}s` }}
                    />
                  ))}
                </span>
              </div>
              {/* Image card */}
              <div className="glass-card absolute bottom-[6%] right-0 w-60 overflow-hidden !rounded-3xl p-2">
                <SceneArt className="h-36 w-full rounded-2xl object-cover" />
                <p className="flex items-center gap-2 px-2 py-2 text-xs font-semibold t-2">
                  <FaImage className="text-[var(--primary)]" /> Text to Image
                </p>
              </div>
              {/* Sliders chip */}
              <div className="glass-card absolute bottom-[38%] left-[6%] flex items-center gap-2.5 !rounded-2xl px-4 py-3">
                <FaSlidersH className="text-[var(--primary)]" />
                <span className="space-y-1.5">
                  <span className="block h-1.5 w-20 rounded-full bg-[var(--surface-3)]">
                    <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
                  </span>
                  <span className="block h-1.5 w-20 rounded-full bg-[var(--surface-3)]">
                    <span className="block h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
                  </span>
                </span>
              </div>
            </motion.div>
          </section>

          {/* ---------- Tool cards ---------- */}
          <section id="tools" className="scroll-mt-24">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={tool.to} className="glass-card card-hover block h-full p-6">
                    <span className="inline-flex rounded-2xl bg-[var(--primary-soft)] p-3.5 text-[var(--primary)]">
                      {tool.icon}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold t-text">{tool.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed t-muted">{tool.text}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Speech to Text strip */}
            <Link
              href="/speech-to-text"
              className="glass-card card-hover mt-5 flex flex-wrap items-center gap-4 p-5"
            >
              <span className="inline-flex rounded-2xl bg-[var(--primary-soft)] p-3.5 text-[var(--primary)]">
                <FaClosedCaptioning className="text-xl" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold t-text">Speech to Text</span>
                <span className="block text-sm t-muted">
                  Dictate in your browser and watch a live transcript appear — English, Urdu, Hindi, Arabic and more.
                </span>
              </span>
              <span className="flex items-center gap-2 font-semibold text-[var(--primary)]">
                Try it <FaArrowRight className="text-sm" />
              </span>
            </Link>
          </section>

          {/* ---------- Stats ---------- */}
          <section className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-lg text-[var(--primary)]">
                  {stat.icon}
                </span>
                <span>
                  <span className="block font-display text-xl font-extrabold t-text">{stat.value}</span>
                  <span className="block text-sm t-muted">{stat.label}</span>
                </span>
              </div>
            ))}
          </section>

          {/* ---------- CTA band ---------- */}
          <section className="relative mt-20 overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 px-8 py-12 text-center shadow-2xl shadow-violet-600/25">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Ready to create something amazing?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-violet-100">
              Join Four AI and turn your ideas into voices and visuals in minutes — free to start.
            </p>
            <Link
              href={primaryHref}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-violet-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {loggedIn ? "Open Dashboard" : "Start Creating Free"} <FaArrowRight />
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

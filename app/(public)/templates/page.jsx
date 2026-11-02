"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaBullhorn,
  FaGraduationCap,
  FaImage,
  FaMicrophoneAlt,
  FaMobileAlt,
  FaPaintBrush,
  FaPlay,
  FaPodcast,
  FaRocket,
  FaUserAstronaut,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

import PageShell from "@/components/PageShell";

const FILTERS = ["All", "Voice", "Image", "Marketing", "Social Media", "Education"];

const TEMPLATES = [
  {
    title: "YouTube Narration",
    categories: ["Voice", "Social Media"],
    icon: <FaYoutube />,
    gradient: "from-violet-600 to-purple-500",
    text: "Welcome back to the channel! In today's video, we're breaking down something that will completely change how you work — so stick around until the end.",
    href: (t) => `/text-to-speech?text=${encodeURIComponent(t)}`,
  },
  {
    title: "Podcast Intro",
    categories: ["Voice"],
    icon: <FaPodcast />,
    gradient: "from-fuchsia-500 to-pink-500",
    text: "Welcome back to the show! I'm your host, and today we're diving deep into the future of artificial intelligence and creativity.",
    href: (t) => `/voice-generator?text=${encodeURIComponent(t)}`,
  },
  {
    title: "Product Ad",
    categories: ["Voice", "Marketing"],
    icon: <FaBullhorn />,
    gradient: "from-violet-500 to-indigo-500",
    text: "Tired of slow, complicated tools? Meet the one app that does it all — faster, smarter, and designed for creators like you. Try it free today!",
    href: (t) => `/voice-generator?text=${encodeURIComponent(t)}`,
  },
  {
    title: "Storytelling",
    categories: ["Voice", "Education"],
    icon: <FaBookOpen />,
    gradient: "from-purple-600 to-violet-500",
    text: "Once upon a time, in a world where machines could speak, a small idea sparked a revolution in how humans create…",
    href: (t) => `/voice-generator?text=${encodeURIComponent(t)}`,
  },
  {
    title: "Social Reel Hook",
    categories: ["Voice", "Social Media", "Marketing"],
    icon: <FaMobileAlt />,
    gradient: "from-fuchsia-600 to-purple-600",
    text: "Stop scrolling! Here are three AI tricks that will save you ten hours every single week — number three is my favourite.",
    href: (t) => `/text-to-speech?text=${encodeURIComponent(t)}`,
  },
  {
    title: "Course Intro",
    categories: ["Voice", "Education"],
    icon: <FaGraduationCap />,
    gradient: "from-indigo-500 to-violet-500",
    text: "Welcome to lesson one. By the end of this module, you'll understand the core concepts and be ready to build your first project with confidence.",
    href: (t) => `/text-to-speech?text=${encodeURIComponent(t)}`,
  },
  {
    title: "AI Art / Wallpaper",
    categories: ["Image"],
    icon: <FaPaintBrush />,
    gradient: "from-violet-600 to-fuchsia-500",
    text: "A majestic mountain valley at sunset, purple and orange sky, a calm lake reflecting the peaks, ultra detailed digital art",
    href: (t) => `/imagegenerator?prompt=${encodeURIComponent(t)}`,
  },
  {
    title: "Character Portrait",
    categories: ["Image"],
    icon: <FaUserAstronaut />,
    gradient: "from-purple-500 to-indigo-600",
    text: "Portrait of a futuristic astronaut explorer, neon city lights reflecting on the visor, cinematic lighting, digital art",
    href: (t) => `/imagegenerator?prompt=${encodeURIComponent(t)}`,
  },
  {
    title: "Product Shot",
    categories: ["Image", "Marketing"],
    icon: <FaRocket />,
    gradient: "from-fuchsia-500 to-violet-600",
    text: "Minimal product photography of a sleek wireless headphone on a soft lavender background, studio lighting, advertising style",
    href: (t) => `/imagegenerator?prompt=${encodeURIComponent(t)}`,
  },
];

export default function Templates() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () => (filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.categories.includes(filter))),
    [filter]
  );

  return (
    <PageShell contentClassName="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <span className="badge">Templates</span>
        <h1 className="mt-4 section-title !text-4xl">Templates</h1>
        <p className="mt-2 text-base t-muted">
          Ready-to-use prompts to get the best results. Pick one and it opens in the tool, ready to generate.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`pill-tab ${filter === f ? "active" : "border-line bg-surface"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((template, i) => (
          <motion.article
            key={template.title}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass-card card-hover flex flex-col overflow-hidden"
          >
            <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${template.gradient}`}>
              <span className="text-5xl text-white/95 drop-shadow-lg">{template.icon}</span>
              <span className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {template.categories[0]}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold t-text">
                {template.categories.includes("Image") ? (
                  <FaImage className="text-sm text-[var(--primary)]" />
                ) : (
                  <FaMicrophoneAlt className="text-sm text-[var(--primary)]" />
                )}
                {template.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed t-muted">{template.text}</p>
              <Link href={template.href(template.text)} className="btn-primary mt-5 w-full justify-center !py-2.5 !text-sm">
                <FaPlay className="text-[10px]" /> Use Template
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}

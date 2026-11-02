"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  FiClock,
  FiFileText,
  FiGrid,
  FiImage,
  FiMic,
  FiSliders,
  FiVolume2,
} from "react-icons/fi";
import { accountApi } from "@/lib/api";
import { getSession } from "@/lib/auth-client";

const IMAGE_DAILY_LIMIT = 25;

const FEATURE_META = {
  "voice-generator": { label: "Voice Generator", icon: <FiMic />, group: "voice" },
  "text-to-speech": { label: "Text to Speech", icon: <FiVolume2 />, group: "voice" },
  "speech-to-text": { label: "Speech to Text", icon: <FiFileText />, group: "voice" },
  "voice-changer": { label: "Voice Changer", icon: <FiSliders />, group: "voice" },
  "image-generator": { label: "Image Generator", icon: <FiImage />, group: "image" },
  image: { label: "Image Generator", icon: <FiImage />, group: "image" },
};

const QUICK_TOOLS = [
  { to: "/voice-generator", label: "Voice Generator", text: "Create custom AI voices", icon: <FiMic />, tint: "bg-violet-500/10 text-violet-600 dark:text-violet-300" },
  { to: "/text-to-speech", label: "Text to Speech", text: "Convert text to audio", icon: <FiVolume2 />, tint: "bg-sky-500/10 text-sky-600 dark:text-sky-300" },
  { to: "/voicechanger", label: "Voice Changer", text: "Change your voice", icon: <FiSliders />, tint: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300" },
  { to: "/imagegenerator", label: "Image Generator", text: "Create images from text", icon: <FiImage />, tint: "bg-amber-500/10 text-amber-600 dark:text-amber-300" },
  { to: "/speech-to-text", label: "Speech to Text", text: "Transcribe your voice live", icon: <FiFileText />, tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300" },
];

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session?.user) setUser(session.user);
    let cancelled = false;
    accountApi
      .getHistory(100)
      .then((res) => {
        if (!cancelled && res?.success) setHistory(res.history || []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const voice = history.filter((h) => FEATURE_META[h.feature]?.group === "voice").length;
    const images = history.filter((h) => FEATURE_META[h.feature]?.group === "image").length;
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const imagesToday = history.filter(
      (h) => FEATURE_META[h.feature]?.group === "image" && new Date(h.timestamp).getTime() > dayAgo
    ).length;
    return {
      total: history.length,
      voice,
      images,
      imagesLeft: Math.max(0, IMAGE_DAILY_LIMIT - imagesToday),
    };
  }, [history]);

  const firstName = (user?.name || "").trim().split(/\s+/)[0] || "there";

  const statCards = [
    { icon: <FiGrid />, value: stats.total, label: "Total Creations", tint: "bg-violet-500/10 text-violet-600 dark:text-violet-300" },
    { icon: <FiMic />, value: stats.voice, label: "Voice Generations", tint: "bg-sky-500/10 text-sky-600 dark:text-sky-300" },
    { icon: <FiImage />, value: stats.images, label: "Images Created", tint: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300" },
    { icon: <FiClock />, value: stats.imagesLeft, label: "Images Left Today", tint: "bg-amber-500/10 text-amber-600 dark:text-amber-300" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight t-text">
            Welcome back, {firstName} 👋
          </h1>
          <p className="mt-1.5 t-muted">Create amazing voices and images with AI.</p>
        </div>
        <Link href="/history" className="pill-tab border-line bg-surface">
          View all creations →
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-card flex items-center gap-4 p-5">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg ${card.tint}`}>
              {card.icon}
            </span>
            <span>
              <span className="block font-display text-2xl font-extrabold leading-none t-text">
                {loading ? "–" : card.value}
              </span>
              <span className="mt-1 block text-[13px] t-muted">{card.label}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Quick tools */}
      <h2 className="mb-4 mt-10 font-display text-lg font-bold t-text">Quick Tools</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {QUICK_TOOLS.map((tool) => (
          <Link key={tool.to} href={tool.to} className="glass-card card-hover group p-5">
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${tool.tint}`}>
              {tool.icon}
            </span>
            <span className="mt-4 block font-display font-bold t-text">{tool.label}</span>
            <span className="mt-1 block text-[13px] leading-snug t-muted">{tool.text}</span>
            <span className="mt-3 block text-[var(--primary)] transition-transform group-hover:translate-x-1">
              <FaArrowRight />
            </span>
          </Link>
        ))}
      </div>

      {/* Recent creations */}
      <div className="mb-4 mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold t-text">Recent Creations</h2>
        <Link href="/history" className="text-sm font-semibold text-[var(--primary)] hover:underline">
          View All →
        </Link>
      </div>
      <div className="glass-card divide-y divide-line overflow-hidden">
        {loading ? (
          <div className="space-y-3 p-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-soft" />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center">
            <FiClock className="mx-auto mb-3 text-3xl text-[var(--primary)] opacity-50" />
            <p className="font-medium t-text">No creations yet</p>
            <p className="mt-1 text-sm t-muted">
              Pick a tool above and make your first voice or image — it will show up here.
            </p>
          </div>
        ) : (
          history.slice(0, 5).map((item) => {
            const meta = FEATURE_META[item.feature] || { label: item.feature, icon: <FiClock /> };
            return (
              <Link key={item.id} href="/history" className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface-2)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  {meta.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold t-text">
                    {item.description || meta.label}
                  </span>
                  <span className="block text-xs t-muted">
                    {meta.label} · {timeAgo(item.timestamp)}
                  </span>
                </span>
                <FaArrowRight className="shrink-0 text-xs t-faint" />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

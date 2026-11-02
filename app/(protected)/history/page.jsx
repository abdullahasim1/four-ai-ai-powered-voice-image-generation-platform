"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FiClock, FiFileText, FiImage, FiMic, FiSliders, FiVolume2 } from "react-icons/fi";

import { ToolHeader } from "@/components/PageShell";
import { toast } from "@/lib/toast";
import { accountApi } from "@/lib/api";

const FEATURE_META = {
  "text-to-speech": { label: "Text to Speech", icon: <FiVolume2 />, group: "voice" },
  "voice-generator": { label: "Voice Generator", icon: <FiMic />, group: "voice" },
  "speech-to-text": { label: "Speech to Text", icon: <FiFileText />, group: "voice" },
  "voice-changer": { label: "Voice Changer", icon: <FiSliders />, group: "voice" },
  "image-generator": { label: "Image Generator", icon: <FiImage />, group: "image" },
  image: { label: "Image Generator", icon: <FiImage />, group: "image" },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function HistoryContent() {
  const searchParams = useSearchParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    accountApi
      .getHistory(100)
      .then((res) => {
        if (!cancelled && res?.success) setHistory(res.history || []);
      })
      .catch(() => {
        if (!cancelled) toast.error("Couldn't load history. Please refresh to try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(
    () => ({
      all: history.length,
      voice: history.filter((h) => FEATURE_META[h.feature]?.group === "voice").length,
      image: history.filter((h) => FEATURE_META[h.feature]?.group === "image").length,
    }),
    [history]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return history.filter((item) => {
      if (tab !== "all" && FEATURE_META[item.feature]?.group !== tab) return false;
      if (!q) return true;
      const meta = FEATURE_META[item.feature];
      return (
        (item.description || "").toLowerCase().includes(q) ||
        (meta?.label || item.feature).toLowerCase().includes(q)
      );
    });
  }, [history, tab, query]);

  const TABS = [
    { key: "all", label: `All (${counts.all})` },
    { key: "voice", label: `Voice (${counts.voice})` },
    { key: "image", label: `Images (${counts.image})` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader
        icon={<FiClock />}
        title="My Creations"
        subtitle="Everything you've generated, synced with your account."
      />

      {/* Tabs + search */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pill-tab ${tab === t.key ? "active" : "border-line bg-surface"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-64">
          <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs t-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="input-field !rounded-full !py-2.5 !pl-10 !text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card h-20 animate-pulse !bg-[var(--surface-2)]" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <FiClock className="mx-auto mb-4 text-4xl text-[var(--primary)] opacity-50" />
          <p className="font-medium t-text">Nothing here yet</p>
          <p className="mt-1 text-sm t-muted">
            Start using the AI tools and your creations will appear here.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p className="font-medium t-text">No matches</p>
          <p className="mt-1 text-sm t-muted">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="glass-card divide-y divide-line overflow-hidden">
          {visible.map((item) => {
            const meta = FEATURE_META[item.feature] || {
              label: item.feature,
              icon: <FiClock />,
            };
            return (
              <div key={item.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface-2)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  {meta.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold t-text">
                    {item.description || meta.label}
                  </h3>
                  <p className="text-xs t-muted">{meta.label}</p>
                </div>
                <span className="shrink-0 text-xs t-faint">{formatDate(item.timestamp)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function History() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6" />}>
      <HistoryContent />
    </Suspense>
  );
}

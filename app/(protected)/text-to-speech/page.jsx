"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FaBookOpen,
  FaCommentDots,
  FaDownload,
  FaLanguage,
  FaMicrophoneAlt,
  FaPlay,
  FaStop,
  FaUser,
  FaVolumeUp,
} from "react-icons/fa";

import { ToolHeader } from "@/components/PageShell";
import { toast } from "@/lib/toast";
import useSpeech from "@/lib/useSpeech";
import { accountApi } from "@/lib/api";

const MAX_CHARS = 5000;

const PRESETS = [
  { name: "Document narration", icon: <FaBookOpen className="text-violet-500" />, text: "Chapter one. In the beginning, the universe was neither quiet nor empty — it hummed with possibility." },
  { name: "Video voiceover", icon: <FaVolumeUp className="text-fuchsia-500" />, text: "What if I told you that everything you know about productivity is wrong? Stay with me — this changes everything." },
  { name: "Podcast intro", icon: <FaMicrophoneAlt className="text-violet-500" />, text: "You're listening to Deep Signals, the show where we decode the technology shaping tomorrow. Let's get into it." },
  { name: "Casual message", icon: <FaCommentDots className="text-sky-500" />, text: "Hey! Just checking in — let me know when you're free to catch up this week." },
];

function TextToSpeechContent() {
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [speed, setSpeed] = useState(1);
  const { voices, isSpeaking, speak, pause, resume, stop } = useSpeech();

  // Seed from a template link (?text=…)
  useEffect(() => {
    const seed = searchParams.get("text");
    if (seed) setText(seed.slice(0, MAX_CHARS));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const languages = useMemo(
    () => [...new Set(voices.map((v) => v.lang))].sort(),
    [voices]
  );
  const filteredVoices = useMemo(
    () => voices.filter((v) => v.lang === selectedLanguage),
    [voices, selectedLanguage]
  );

  // Defaults once voices load
  useEffect(() => {
    if (voices.length && !selectedVoice) {
      const def = voices.find((v) => v.default && v.lang.startsWith("en")) || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      setSelectedVoice(def);
      setSelectedLanguage(def.lang);
    }
  }, [voices, selectedVoice]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    const next = voices.find((v) => v.lang === lang);
    if (next) setSelectedVoice(next);
  };

  const handlePlayPause = () => {
    if (!text.trim()) {
      toast.error("Enter some text first");
      return;
    }
    if (isSpeaking) {
      pause();
      return;
    }
    if (window.speechSynthesis?.paused && window.speechSynthesis?.speaking) {
      resume();
      return;
    }
    speak({ text, voice: selectedVoice, rate: speed });
    accountApi
      .trackActivity("text-to-speech", `Converted ${text.length} characters to speech`)
      .catch(() => {});
  };

  const previewVoice = (voice) => {
    speak({ text: `Hi, I'm ${voice.name}.`, voice, rate: speed });
  };

  const handleDownload = () => {
    toast.info("Browser speech can't be saved as a file directly — use Voice Changer to export WAV audio.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader
        icon={<FaVolumeUp />}
        title="Text to Speech"
        subtitle="Convert any text into natural-sounding speech."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Text card */}
        <div className="glass-card p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            rows={9}
            placeholder="Enter your text here…"
            className="input-field resize-none leading-relaxed"
          />
          <div className="mt-2 flex justify-between text-xs t-faint">
            <span>Supports long-form scripts</span>
            <span className={text.length >= MAX_CHARS ? "font-semibold text-rose-500" : ""}>
              {text.length} / {MAX_CHARS}
            </span>
          </div>

          {/* Presets */}
          <div className="mt-6 border-t border-line pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider t-faint">Use-case presets</p>
            <div className="flex flex-wrap gap-2.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setText(preset.text);
                    toast.info(`"${preset.name}" loaded`);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm t-2 transition-all hover:border-[var(--primary-soft-border)] hover:text-[var(--primary)]"
                >
                  {preset.icon}
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls panel */}
        <div className="glass-card space-y-5 p-6">
          <div>
            <label className="input-label"><FaLanguage /> Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="input-field"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label"><FaUser /> Voice</label>
            <select
              value={selectedVoice?.name || ""}
              onChange={(e) => setSelectedVoice(voices.find((v) => v.name === e.target.value))}
              className="input-field"
            >
              {(filteredVoices.length ? filteredVoices : voices).map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">
              Speed <span className="ml-auto font-semibold t-text">{speed.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button onClick={handlePlayPause} className="btn-primary flex-1 justify-center" disabled={!text.trim()}>
              {isSpeaking ? (
                <>
                  <FaStop className="rotate-90 text-xs" /> Pause
                </>
              ) : (
                <>
                  Convert to Speech <FaPlay className="text-xs" />
                </>
              )}
            </button>
            <button onClick={stop} disabled={!isSpeaking} className="btn-secondary !px-3.5" title="Stop">
              <FaStop />
            </button>
            <button
              onClick={handleDownload}
              className="btn-secondary !px-3.5"
              title="Export audio"
            >
              <FaDownload />
            </button>
          </div>
        </div>
      </div>

      {/* Voice gallery */}
      <h3 className="mb-4 mt-10 flex items-center gap-2 font-display text-lg font-bold t-text">
        <FaMicrophoneAlt className="text-[var(--primary)]" /> Available voices
      </h3>
      {voices.length === 0 ? (
        <p className="glass-card p-6 text-center text-sm t-muted">
          No system voices detected yet — try reloading the page.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(filteredVoices.length ? filteredVoices : voices).map((voice) => (
            <button
              key={voice.name + voice.lang}
              onClick={() => setSelectedVoice(voice)}
              className={`glass-card card-hover flex items-center gap-4 p-4 text-left ${
                selectedVoice?.name === voice.name ? "!border-[var(--primary)] !bg-[var(--primary-soft)]" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 font-display text-sm font-bold text-white">
                {voice.name.trim().charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold t-text">{voice.name}</span>
                <span className="block text-xs t-muted">{voice.lang}{voice.default ? " · default" : ""}</span>
              </span>
              <span
                role="button"
                tabIndex={0}
                aria-label={`Preview ${voice.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  previewVoice(voice);
                }}
                onKeyDown={(e) => e.key === "Enter" && previewVoice(voice)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-xs t-muted transition-all hover:border-[var(--primary-soft-border)] hover:text-[var(--primary)]"
              >
                <FaPlay />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TextToSpeech() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-8 sm:px-6" />}>
      <TextToSpeechContent />
    </Suspense>
  );
}

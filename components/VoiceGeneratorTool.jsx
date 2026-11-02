"use client";

import { useEffect, useState } from "react";
import { FaBookOpen, FaMicrophone, FaPause, FaPlay, FaPodcast, FaStop, FaVideo } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "@/lib/toast";
import useSpeech from "@/lib/useSpeech";
import { accountApi } from "@/lib/api";

const PRESETS = [
  {
    label: "Tell a story",
    icon: <FaBookOpen className="text-violet-500" />,
    text: "Once upon a time, in a world where machines could speak, a small idea sparked a revolution in how humans create…",
  },
  {
    label: "Podcast intro",
    icon: <FaPodcast className="text-emerald-500" />,
    text: "Welcome back to the show! I'm your host, and today we're diving deep into the future of artificial intelligence and creativity.",
  },
  {
    label: "Video voiceover",
    icon: <FaVideo className="text-sky-500" />,
    text: "In this video, you'll discover three powerful techniques that will completely change the way you produce content.",
  },
];

const MAX_CHARS = 500;
const WAVE_HEIGHTS = [8, 14, 20, 10, 24, 16, 26, 12, 22, 9, 18, 24, 13, 20, 15, 23, 11, 17, 21, 14, 25, 12, 19, 16];

/**
 * The voice-generator editor, board layout: script card on the left,
 * voice controls panel on the right. Used on /voice-generator and /home.
 */
export function VoiceGeneratorTool({ initialText }) {
  const [text, setText] = useState(
    initialText ||
      "The Four AI voice generator delivers high-quality, human-like speech. Perfect for audiobooks, video voiceovers, commercials, and more."
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(0); // percent offset, -50..+50
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { voices, isSpeaking, speak, pause, resume, stop } = useSpeech();

  // Pick a sensible default voice once loaded
  useEffect(() => {
    if (voices.length && !selectedVoice) {
      setSelectedVoice(voices.find((v) => v.default) || voices[0]);
    }
  }, [voices, selectedVoice]);

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
    speak({ text, voice: selectedVoice, rate, pitch: 1 + pitch / 100 });
    accountApi
      .trackActivity(
        "voice-generator",
        `Generated voice preview: "${text.slice(0, 40)}${text.length > 40 ? "…" : ""}"`
      )
      .catch(() => {});
  };

  const applyPreset = (presetText) => {
    setText(presetText);
    toast.info("Sample text added — press Generate Voice to hear it");
  };

  return (
    <div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Script card */}
        <div className="glass-card p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            rows={8}
            placeholder="Enter text to generate voice…"
            className="input-field resize-none leading-relaxed"
          />
          <div className="mt-2 flex items-center justify-between text-xs t-faint">
            <span>{text.length > MAX_CHARS - 50 ? "Approaching limit" : "Tip: punctuation makes pacing sound natural"}</span>
            <span className={text.length >= MAX_CHARS ? "font-semibold text-rose-500" : ""}>
              {text.length} / {MAX_CHARS}
            </span>
          </div>

          {/* Playback status bar */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-soft px-4 py-3">
            <button
              onClick={handlePlayPause}
              aria-label={isSpeaking ? "Pause" : "Play"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105"
            >
              {isSpeaking ? <FaPause className="text-xs" /> : <FaPlay className="ml-0.5 text-xs" />}
            </button>
            <span className="flex h-8 flex-1 items-center gap-[3px] overflow-hidden">
              {WAVE_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className={`w-[3px] shrink-0 rounded-full bg-gradient-to-t from-violet-500 to-fuchsia-400 ${isSpeaking ? "wave-bar" : ""}`}
                  style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </span>
            <span className="shrink-0 text-xs font-medium t-muted">
              {isSpeaking ? "Playing…" : "Ready"}
            </span>
          </div>
        </div>

        {/* Controls panel */}
        <div className="glass-card space-y-5 p-6">
          {/* Voice selector */}
          <div className="relative">
            <label className="input-label">Voice</label>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="input-field flex items-center gap-2.5 text-left"
              type="button"
            >
              <FaMicrophone className="shrink-0 text-[var(--primary)]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold t-text">
                  {selectedVoice ? selectedVoice.name : "Loading voices…"}
                </span>
                {selectedVoice && <span className="block text-xs t-muted">{selectedVoice.lang}</span>}
              </span>
              <IoMdArrowDropdown className="shrink-0 t-muted" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-line bg-surface py-1 shadow-[var(--shadow-pop)]">
                {voices.map((v) => (
                  <button
                    key={v.name + v.lang}
                    onClick={() => {
                      setSelectedVoice(v);
                      setDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-[var(--surface-2)] ${
                      selectedVoice?.name === v.name ? "font-semibold text-[var(--primary)]" : "t-2"
                    }`}
                  >
                    <span className="truncate">{v.name}</span>
                    <span className="ml-2 text-xs t-faint">{v.lang}</span>
                  </button>
                ))}
                {voices.length === 0 && (
                  <p className="px-4 py-3 text-sm t-muted">No voices found in this browser</p>
                )}
              </div>
            )}
          </div>

          {/* Speed */}
          <div>
            <label className="input-label">
              Speed <span className="ml-auto font-semibold t-text">{rate.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="input-label">
              Pitch <span className="ml-auto font-semibold t-text">{pitch > 0 ? `+${pitch}` : pitch}%</span>
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              step="5"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button onClick={handlePlayPause} className="btn-primary flex-1 justify-center">
              {isSpeaking ? (
                <>
                  <FaPause /> Pause
                </>
              ) : (
                <>
                  Generate Voice <FaPlay className="text-xs" />
                </>
              )}
            </button>
            <button onClick={stop} disabled={!isSpeaking} className="btn-secondary !px-3.5" title="Stop">
              <FaStop />
            </button>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider t-faint">Quick starts</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset.text)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm t-2 transition-all hover:border-[var(--primary-soft-border)] hover:text-[var(--primary)]"
          >
            {preset.icon}
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

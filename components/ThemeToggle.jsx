"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { applyTheme, getThemePref, isDarkActive } from "@/lib/theme";

/** Compact sun/moon toggle for headers. Cycles light <-> dark. */
export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(isDarkActive());
    sync();
    window.addEventListener("fourai:theme-changed", sync);
    return () => window.removeEventListener("fourai:theme-changed", sync);
  }, []);

  const toggle = () => {
    applyTheme(dark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-[var(--muted)] transition-colors hover:text-[var(--primary)] ${className}`}
    >
      {dark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
    </button>
  );
}

/** Light / Dark / System segmented control for the Settings page. */
export function ThemeSegmented() {
  const [pref, setPref] = useState("light");

  useEffect(() => {
    setPref(getThemePref());
  }, []);

  const choose = (value) => {
    setPref(value);
    applyTheme(value);
  };

  return (
    <div className="inline-flex rounded-xl border border-line bg-soft p-1">
      {[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System" },
      ].map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => choose(opt.value)}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
            pref === opt.value
              ? "bg-surface text-[var(--primary)] shadow-sm"
              : "t-muted hover:text-[var(--text)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { getSession } from "@/lib/auth-client";

const COLUMNS = [
  {
    title: "AI Tools",
    links: [
      { label: "Voice Generator", to: "/voice-generator" },
      { label: "Text to Speech", to: "/text-to-speech" },
      { label: "Speech to Text", to: "/speech-to-text" },
      { label: "Voice Changer", to: "/voicechanger" },
      { label: "Image Generator", to: "/imagegenerator" },
      { label: "Voice Library", to: "/explore-voice-library" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Templates", to: "/templates" },
      { label: "Pricing", to: "/pricing" },
      { label: "Team", to: "/team" },
      { label: "Home", to: "/home" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Profile", to: "/profile" },
      { label: "My Creations", to: "/history" },
      { label: "Settings", to: "/settings" },
    ],
  },
];

const SOCIALS = [
  { icon: FaGithub, label: "GitHub" },
  { icon: FaLinkedin, label: "LinkedIn" },
  { icon: FaTwitter, label: "Twitter" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaDiscord, label: "Discord" },
];

export default function Footer() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getSession()));
    const sync = () => setLoggedIn(Boolean(getSession()));
    window.addEventListener("fourai:auth-changed", sync);
    return () => window.removeEventListener("fourai:auth-changed", sync);
  }, []);

  const accountLinks = loggedIn
    ? COLUMNS.find((c) => c.title === "Account")?.links || []
    : [
        { label: "Log in", to: "/login" },
        { label: "Sign up", to: "/signup" },
        ...(COLUMNS.find((c) => c.title === "Account")?.links || []),
      ];

  return (
    <footer className="relative z-10 border-t border-line bg-surface">
      <div data-reveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/home" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Four AI logo" className="h-9 w-auto rounded-md" />
              <span className="font-display text-xl font-bold t-text">
                Four<span className="gradient-text"> AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed t-muted">
              Studio-grade AI voice and image generation. Create natural speech, transform
              audio, and turn ideas into visuals — all in one place.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  onClick={(e) => e.preventDefault()}
                  className="rounded-lg border border-line bg-soft p-2.5 t-muted transition-all hover:-translate-y-0.5 hover:border-[var(--primary-soft-border)] hover:text-[var(--primary)]"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider t-text">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {(column.title === "Account" ? accountLinks : column.links).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.to}
                      className="text-sm t-muted transition-colors hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs t-faint">
            © {new Date().getFullYear()} Four AI. All rights reserved.
          </p>
          <p className="text-xs t-faint">Built for creators, powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}

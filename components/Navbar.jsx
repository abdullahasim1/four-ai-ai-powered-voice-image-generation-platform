"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaChevronDown,
  FaCog,
  FaHistory,
  FaSignOutAlt,
  FaThLarge,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { FiFileText, FiImage, FiMic, FiSliders, FiVolume2 } from "react-icons/fi";
import { clearSession, getSession } from "@/lib/auth-client";
import { authApi } from "@/lib/api";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { title: "Home", path: "/home" },
  { title: "Templates", path: "/templates" },
  { title: "Pricing", path: "/pricing" },
  { title: "Features", path: "/features" },
  { title: "Team", path: "/team" },
];

const AI_TOOLS = [
  { to: "/voice-generator", label: "Voice Generator", icon: <FiMic /> },
  { to: "/text-to-speech", label: "Text to Speech", icon: <FiVolume2 /> },
  { to: "/speech-to-text", label: "Speech to Text", icon: <FiFileText /> },
  { to: "/voicechanger", label: "Voice Changer", icon: <FiSliders /> },
  { to: "/imagegenerator", label: "Image Generator", icon: <FiImage /> },
];

const DROPDOWN_ITEM =
  "flex items-center gap-3 px-4 py-2.5 text-sm t-2 transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const dropdownRef = useRef(null);
  const toolsRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setSession(getSession());
    const sync = () => setSession(getSession());
    window.addEventListener("fourai:auth-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("fourai:auth-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      /* session may already be gone */
    }
    clearSession();
    window.dispatchEvent(new Event("fourai:auth-changed"));
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/home" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Four AI logo" className="h-8 w-auto rounded-md" />
          <span className="font-display text-lg font-bold tracking-tight t-text">
            Four<span className="gradient-text"> AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/home" className={`nav-link ${pathname === "/home" ? "active" : ""}`}>
            Home
          </Link>

          {/* Tools dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen((v) => !v)}
              className={`flex items-center gap-1.5 nav-link ${
                AI_TOOLS.some((t) => t.to === pathname) ? "active" : ""
              }`}
            >
              Tools
              <FaChevronDown className={`text-[10px] transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-pop)]"
                >
                  {AI_TOOLS.map((tool) => (
                    <Link
                      key={tool.to}
                      href={tool.to}
                      onClick={() => setToolsOpen(false)}
                      className={DROPDOWN_ITEM}
                    >
                      <span className="text-[var(--primary)]">{tool.icon}</span>
                      {tool.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${pathname === link.path ? "active" : ""}`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {!session ? (
            <>
              <Link href="/login" className="hidden text-sm font-medium t-2 transition-colors hover:text-[var(--text)] sm:block">
                Log in
              </Link>
              <Link href="/signup" className="btn-primary !px-4 !py-2 !text-sm">
                Get Started <FaArrowRight className="text-xs" />
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3 transition-colors hover:border-[var(--border-strong)]"
              >
                {session.user.avatar ? (
                  <img src={session.user.avatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <FaUserCircle className="h-6 w-6 text-[var(--primary)]" />
                )}
                <span className="hidden max-w-[120px] truncate text-sm font-medium t-text sm:block">
                  {session.user.name}
                </span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-pop)]"
                  >
                    <div className="border-b border-line px-4 py-3">
                      <p className="truncate text-sm font-semibold t-text">{session.user.name}</p>
                      <p className="truncate text-xs t-muted">{session.user.email}</p>
                    </div>
                    {[
                      { to: "/dashboard", icon: <FaThLarge />, label: "Dashboard" },
                      { to: "/profile", icon: <FaUser />, label: "My Profile" },
                      { to: "/history", icon: <FaHistory />, label: "My Creations" },
                      { to: "/settings", icon: <FaCog />, label: "Settings" },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        href={item.to}
                        onClick={() => setDropdownOpen(false)}
                        className={DROPDOWN_ITEM}
                      >
                        <span className="text-[var(--primary)]">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                    {session.user.role === "admin" && (
                      <Link href="/admin/dashboard" onClick={() => setDropdownOpen(false)} className={DROPDOWN_ITEM}>
                        <span className="text-[var(--primary)]"><FaUserCircle /></span>
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-500 transition-colors hover:bg-rose-500/10"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="rounded-lg p-2 t-muted transition-colors hover:bg-[var(--surface-2)] md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line bg-surface md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    pathname === link.path ? "bg-[var(--primary-soft)] font-semibold text-[var(--primary)]" : "t-2"
                  }`}
                >
                  {link.title}
                </Link>
              ))}

              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider t-faint">
                AI Tools
              </p>
              {AI_TOOLS.map((tool) => (
                <Link
                  key={tool.to}
                  href={tool.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    pathname === tool.to ? "bg-[var(--primary-soft)] font-semibold text-[var(--primary)]" : "t-2"
                  }`}
                >
                  <span className="text-[var(--primary)]">{tool.icon}</span>
                  {tool.label}
                </Link>
              ))}

              {session && (
                <Link href="/dashboard" className="block rounded-lg px-3 py-2 text-sm t-2">
                  Dashboard
                </Link>
              )}
              {!session && (
                <Link href="/login" className="block rounded-lg px-3 py-2 text-sm t-2">
                  Log in
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

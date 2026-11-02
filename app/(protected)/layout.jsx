"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { getSession } from "@/lib/auth-client";

function TopBar({ user, onMenu }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    router.push(query.trim() ? `/history?q=${encodeURIComponent(query.trim())}` : "/history");
  };

  return (
    <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-line bg-[var(--header-bg)] px-4 py-3 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface t-muted lg:hidden"
      >
        <FaBars className="text-sm" />
      </button>
      <form onSubmit={submitSearch} className="relative min-w-0 flex-1 sm:max-w-xs">
        <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs t-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search creations…"
          className="input-field !rounded-full !py-2.5 !pl-10 !text-sm"
        />
      </form>
      <div className="ml-auto flex items-center gap-2.5">
        <ThemeToggle />
        <Link href="/profile" aria-label="Your profile" className="block">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-[var(--primary-soft-border)]" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white">
              {(user?.name || "U").trim().charAt(0).toUpperCase()}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

/**
 * Client-side auth guard + app shell (sidebar layout, design-board style)
 * for the dashboard, tools and account pages.
 */
export default function ProtectedLayout({ children }) {
  const [session, setSession] = useState(undefined); // undefined = checking
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSession(getSession());
    const sync = () => setSession(getSession());
    window.addEventListener("fourai:auth-changed", sync);
    return () => window.removeEventListener("fourai:auth-changed", sync);
  }, []);

  useEffect(() => {
    if (session === null) router.replace("/login");
  }, [session, router]);

  if (!session) {
    return (
      <div className="page-shell relative flex min-h-screen items-center justify-center">
        <div className="mesh-bg absolute inset-0" aria-hidden="true" />
        <span className="relative z-10 h-10 w-10 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-line bg-surface lg:block">
        <AppSidebar user={session.user} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/45" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-surface shadow-2xl">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line t-muted"
            >
              <FaTimes className="text-sm" />
            </button>
            <AppSidebar user={session.user} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="relative min-w-0 flex-1">
        <div className="mesh-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Suspense fallback={<div className="h-[65px] border-b border-line" />}>
            <TopBar user={session.user} onMenu={() => setDrawerOpen(true)} />
          </Suspense>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

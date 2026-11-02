"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaClosedCaptioning,
  FaCog,
  FaCrown,
  FaHistory,
  FaImage,
  FaMicrophoneAlt,
  FaSignOutAlt,
  FaSlidersH,
  FaThLarge,
  FaThList,
  FaUser,
  FaUserCircle,
  FaVolumeUp,
} from "react-icons/fa";
import { clearSession } from "@/lib/auth-client";
import { authApi } from "@/lib/api";

export const TOOL_LINKS = [
  { to: "/voice-generator", label: "Voice Generator", icon: <FaMicrophoneAlt /> },
  { to: "/text-to-speech", label: "Text to Speech", icon: <FaVolumeUp /> },
  { to: "/speech-to-text", label: "Speech to Text", icon: <FaClosedCaptioning /> },
  { to: "/voicechanger", label: "Voice Changer", icon: <FaSlidersH /> },
  { to: "/imagegenerator", label: "Image Generator", icon: <FaImage /> },
];

const MANAGE_LINKS = [
  { to: "/history", label: "My Creations", icon: <FaHistory /> },
  { to: "/templates", label: "Templates", icon: <FaThList /> },
  { to: "/profile", label: "Profile", icon: <FaUser /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

export default function AppSidebar({ user, onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();

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

  const linkCls = (to) => `side-link ${pathname === to ? "active" : ""}`;

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <Link href="/dashboard" className="flex items-center gap-2.5 px-5 pb-2 pt-6" onClick={onNavigate}>
        <img src="/logo.png" alt="Four AI logo" className="h-9 w-auto rounded-lg" />
        <span className="font-display text-xl font-bold t-text">
          Four<span className="gradient-text"> AI</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div>
          <Link href="/dashboard" className={linkCls("/dashboard")} onClick={onNavigate}>
            <FaThLarge /> Dashboard
          </Link>
        </div>

        <div>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider t-faint">Tools</p>
          <div className="space-y-1">
            {TOOL_LINKS.map((item) => (
              <Link key={item.to} href={item.to} className={linkCls(item.to)} onClick={onNavigate}>
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider t-faint">Manage</p>
          <div className="space-y-1">
            {MANAGE_LINKS.map((item) => (
              <Link key={item.to} href={item.to} className={linkCls(item.to)} onClick={onNavigate}>
                {item.icon} {item.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link href="/admin/dashboard" className={linkCls("/admin/dashboard")} onClick={onNavigate}>
                <FaUserCircle /> Admin Panel
              </Link>
            )}
          </div>
        </div>

        {/* Upgrade card */}
        <div className="mx-2 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-5 text-white shadow-lg shadow-violet-600/25">
          <FaCrown className="text-xl text-amber-300" />
          <p className="mt-2.5 font-display font-bold">Upgrade to Pro</p>
          <p className="mt-1 text-xs leading-relaxed text-violet-100">
            Unlock higher limits, faster generation.
          </p>
          <Link
            href="/pricing"
            onClick={onNavigate}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3.5 py-2 text-xs font-bold text-violet-700 transition-transform hover:-translate-y-0.5"
          >
            Upgrade Now →
          </Link>
        </div>
      </nav>

      {/* User chip */}
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 font-display text-sm font-bold text-white">
              {(user?.name || "U").trim().charAt(0).toUpperCase()}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold t-text">{user?.name}</span>
            <span className="block truncate text-xs t-muted">{user?.email}</span>
          </span>
          <button
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="rounded-lg p-2 t-muted transition-colors hover:bg-rose-500/10 hover:text-rose-500"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

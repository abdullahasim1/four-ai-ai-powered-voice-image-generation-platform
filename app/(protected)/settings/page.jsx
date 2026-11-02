"use client";

import { Suspense, useEffect, useState } from "react";
import { FaCheckCircle, FaCog, FaEnvelope, FaExclamationTriangle, FaKey, FaUser } from "react-icons/fa";

import { ToolHeader } from "@/components/PageShell";
import { ThemeSegmented } from "@/components/ThemeToggle";
import { toast } from "@/lib/toast";
import { accountApi } from "@/lib/api";
import { getSession, updateUser } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

const EMAIL_CHANGE_STATES = {
  "1": {
    tone: "ok",
    text: "Email changed successfully! Use your new email from next login.",
  },
  invalid: {
    tone: "err",
    text: "This email change link is invalid or has expired. Please request a new one.",
  },
  taken: {
    tone: "err",
    text: "That email was registered by another account in the meantime. Please try a different one.",
  },
  error: {
    tone: "err",
    text: "Something went wrong while confirming your email. Please try again.",
  },
};

function PasswordPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setSaving(true);
    try {
      const data = await accountApi.updatePassword({ currentPassword, newPassword });
      if (data.success) {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirm("");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form id="password" onSubmit={handleSubmit} className="glass-card scroll-mt-24 space-y-4 p-6" data-reveal>
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold t-text">
        <FaKey className="text-[var(--primary)]" /> Change password
      </h3>
      <div>
        <label className="input-label">Current password</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          className="input-field"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="input-label">New password</label>
        <input
          type="password"
          required
          autoComplete="new-password"
          className="input-field"
          placeholder="At least 6 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="input-label">Confirm new password</label>
        <input
          type="password"
          required
          autoComplete="new-password"
          className="input-field"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <button type="submit" disabled={saving} className="btn-primary w-full justify-center">
        {saving ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [requestedFor, setRequestedFor] = useState("");

  const [savingName, setSavingName] = useState(false);

  const changeState = EMAIL_CHANGE_STATES[searchParams.get("emailChanged")];

  const refreshFromSession = () => {
    const session = getSession();
    if (session?.user) {
      setUser(session.user);
      setName(session.user.name || "");
    }
    return session;
  };

  useEffect(() => {
    refreshFromSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSavingName(true);
    try {
      const session = getSession();
      const res = await accountApi.updateProfile({ name });
      if (!res.success) throw new Error(res.message || "Name update failed");

      updateUser({ ...session.user, name: res.user?.name || name.trim() });
      window.dispatchEvent(new Event("fourai:auth-changed"));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSavingName(false);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailBusy(true);
    setRequestedFor("");
    try {
      const data = await accountApi.updateEmail({
        email: newEmail,
        currentPassword: emailPassword,
      });
      if (data.success) {
        setRequestedFor(data.pendingEmail || newEmail.toLowerCase().trim());
        setNewEmail("");
        setEmailPassword("");
        const session = getSession();
        if (session) {
          updateUser({ ...session.user, pendingEmail: data.pendingEmail });
          window.dispatchEvent(new Event("fourai:auth-changed"));
        }
        toast.success("Confirmation email sent!");
      } else {
        toast.error(data.message || "Could not send confirmation");
      }
    } catch (err) {
      toast.error(err.message || "Could not send confirmation");
    } finally {
      setEmailBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ToolHeader icon={<FaCog />} title="Settings" subtitle="Manage your account information." />

      <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Section nav */}
        <div className="glass-card hidden p-3 lg:block">
          {[
            { href: "#account", label: "Account", icon: <FaUser /> },
            { href: "#email", label: "Change email", icon: <FaEnvelope /> },
            { href: "#password", label: "Password", icon: <FaKey /> },
            { href: "#appearance", label: "Appearance", icon: <FaCog /> },
          ].map((item) => (
            <a key={item.href} href={item.href} className="side-link">
              {item.icon} {item.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-3 border-t border-line px-2 pb-1 pt-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 font-display text-sm font-bold text-white">
              {(user?.name || "U").trim().charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold t-text">{user?.name}</span>
              <span className="block truncate text-xs t-muted">{user?.email}</span>
            </span>
          </div>
        </div>

        <div className="min-w-0">

      {changeState && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
            changeState.tone === "ok"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300"
          }`}
        >
          {changeState.tone === "ok" ? (
            <FaCheckCircle className="shrink-0 text-lg" />
          ) : (
            <FaExclamationTriangle className="shrink-0 text-lg" />
          )}
          {changeState.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Display name */}
        <form id="account" onSubmit={handleNameSave} className="glass-card scroll-mt-24 space-y-4 p-6" data-reveal>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold t-text">
            <FaUser className="text-[var(--primary)]" /> Profile details
          </h3>
          <div>
            <label className="input-label">Display name</label>
            <input
              type="text"
              required
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" disabled={savingName} className="btn-primary w-full justify-center">
            {savingName ? "Saving…" : "Save name"}
          </button>
        </form>

        {/* Email change with verification */}
        <form id="email" onSubmit={handleEmailChange} className="glass-card scroll-mt-24 space-y-4 p-6" data-reveal>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold t-text">
            <FaEnvelope className="text-[var(--primary)]" /> Change email
          </h3>

          <p className="rounded-lg border border-line bg-soft px-3 py-2 text-xs leading-relaxed t-muted">
            Current email: <span className="font-semibold t-text">{user?.email}</span>
            {user?.pendingEmail && (
              <>
                <br />
                Pending confirmation for:{" "}
                <span className="font-semibold text-amber-600 dark:text-amber-300">{user.pendingEmail}</span> — check that inbox.
              </>
            )}
          </p>

          {requestedFor && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-300">
              <FaCheckCircle /> Confirmation link sent to <b>{requestedFor}</b>. Your email changes after you click it.
            </p>
          )}

          <div>
            <label className="input-label">New email address</label>
            <input
              type="email"
              required
              autoComplete="email"
              className="input-field"
              placeholder="new-address@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label"><FaKey /> Current password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
              placeholder="Confirm it's really you"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={emailBusy} className="btn-primary w-full justify-center">
            {emailBusy ? "Sending…" : "Send confirmation email"}
          </button>
        </form>

        <PasswordPanel />

        {/* Appearance */}
        <div id="appearance" className="glass-card scroll-mt-24 space-y-3 p-6" data-reveal>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold t-text">
            <FaCog className="text-[var(--primary)]" /> Appearance
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium t-text">Theme</p>
              <p className="text-xs t-muted">Choose how Four AI looks on this device.</p>
            </div>
            <ThemeSegmented />
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default function Settings() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-500" />
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}

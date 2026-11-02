"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const ICONS = {
  success: <FaCheckCircle className="text-emerald-400" />,
  error: <FaExclamationCircle className="text-rose-400" />,
  info: <FaInfoCircle className="text-violet-500" />,
};

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      const item = event.detail;
      setToasts((prev) => [...prev.slice(-3), item]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== item.id));
      }, 4200);
    };
    window.addEventListener("fourai:toast", handler);
    return () => window.removeEventListener("fourai:toast", handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex w-[min(92vw,360px)] flex-col gap-3">
      {toasts.map((item) => (
        <div
          key={item.id}
          className="toast-enter flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-[var(--shadow-pop)]"
        >
          <span className="mt-0.5 text-lg">{ICONS[item.type] || ICONS.info}</span>
          <p className="flex-1 text-sm leading-snug t-text">{item.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== item.id))}
            className="t-faint transition-colors hover:text-[var(--text)]"
            aria-label="Dismiss"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      ))}
    </div>
  );
}

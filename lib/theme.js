/**
 * Theme preference: "light" | "dark" | "system" (default "light" —
 * the design board is Light Modern; "system" is an explicit choice in
 * Settings). Applied as a `.dark` class on <html>;
 * an inline script in the root layout sets it before first paint.
 */
export const THEME_KEY = "fourai-theme";

export function getThemePref() {
  if (typeof window === "undefined") return "light";
  try {
    return localStorage.getItem(THEME_KEY) || "light";
  } catch {
    return "light";
  }
}

export function applyTheme(pref) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch {
    /* private mode */
  }
  const dark =
    pref === "dark" ||
    (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  window.dispatchEvent(new Event("fourai:theme-changed"));
}

export function isDarkActive() {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

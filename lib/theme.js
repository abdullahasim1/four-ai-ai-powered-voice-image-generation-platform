/**
 * Theme preference: "light" | "dark" | "system" (default "system",
 * first visit follows the OS). Applied as a `.dark` class on <html>;
 * an inline script in the root layout sets it before first paint.
 */
export const THEME_KEY = "fourai-theme";

export function getThemePref() {
  if (typeof window === "undefined") return "system";
  try {
    return localStorage.getItem(THEME_KEY) || "system";
  } catch {
    return "system";
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

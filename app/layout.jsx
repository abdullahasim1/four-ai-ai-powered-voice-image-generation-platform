import "./globals.css";
import { Toaster } from "@/components/Toaster";
import GsapAnimations from "@/components/GsapAnimations";

export const metadata = {
  title: {
    default: "Four AI — AI Voice & Image Studio",
    template: "%s · Four AI",
  },
  description:
    "Four AI — studio-grade AI voice generation, text-to-speech, voice effects and AI image creation in one clean workspace.",
  icons: { icon: "/logo.png" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1fe" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a18" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint so the saved theme never flashes the wrong one.
const THEME_INIT = `(function(){try{var t=localStorage.getItem("fourai-theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <GsapAnimations />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

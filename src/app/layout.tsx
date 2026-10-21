import type { ReactNode } from "react";
import "./globals.css";

// Root layout is minimal. The locale layout at src/app/[locale]/layout.tsx owns html, lang, dir, and fonts.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Figtree } from "next/font/google";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "AP Academy | 1-on-1 Online Tutoring for Grade 11–12 Math & Physics",
  description:
    "Personalized, live online tutoring for Ontario grade 11 and 12 students in Advanced Functions, Calculus and Physics. $60/hour, first lesson free, no packages.",
};

export const viewport: Viewport = {
  themeColor: "#fbf9f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${bricolage.variable} ${figtree.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Mark JS before paint so reveal styles only hide content when they can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}

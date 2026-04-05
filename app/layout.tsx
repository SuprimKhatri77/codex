import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Search from "@/components/Search";
import { getAllNotes } from "@/lib/mdx";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "codex",
    template: "%s | codex",
  },
  description: "things i figured out, written down",
  metadataBase: new URL("https://codex.suprimkhatri.com.np"),
  openGraph: {
    title: "codex",
    description: "things i figured out, written down",
    url: "https://codex.suprimkhatri.com.np",
    siteName: "codex",
    images: [
      {
        url: "https://codex.suprimkhatri.com.np/og-image.png",
        width: 1200,
        height: 630,
        alt: "codex",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "codex",
    description: "things i figured out, written down",
    images: ["https://codex.suprimkhatri.com.np/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allNotes = getAllNotes();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d] ">
        <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0d0d0d] border-b border-[#1a1a1a]">
          <div className="max-w-4xl mx-auto px-8 h-12 flex items-center justify-between">
            <Link
              href="/"
              className="font-mono text-[11px] text-[#444] hover:text-[#aaa] tracking-[0.15em] uppercase transition-colors"
            >
              ~/codex
            </Link>
            <Search notes={allNotes} />
          </div>
        </nav>
        <div className="pt-12">{children}</div>
      </body>
    </html>
  );
}

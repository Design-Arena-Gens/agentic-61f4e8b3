import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto Viral Content Agent",
  description:
    "Instantly generate viral-short-form content systems: scripts, narration, edit plans, captions, hashtags, and engagement boosters.",
  metadataBase: new URL("https://agentic-61f4e8b3.vercel.app"),
  openGraph: {
    title: "Auto Viral Content Agent",
    description:
      "Drop a category. Get a 19-second viral reel playbook optimised for Reels, TikTok, and Shorts.",
    url: "https://agentic-61f4e8b3.vercel.app",
    siteName: "Auto Viral Content Agent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto Viral Content Agent",
    description:
      "Generate complete viral short-form campaigns instantly, from hook to auto-replies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

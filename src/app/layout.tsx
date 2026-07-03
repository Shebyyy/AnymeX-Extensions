import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://anymex-extensions.vercel.app'),
  title: "AnymeX Extensions",
  description: "Browse and install extensions for AnymeX — all platforms, all repos, one place",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "AnymeX Extensions",
    description: "Browse and install extensions for AnymeX — all platforms, all repos, one place",
    type: "website",
    url: "https://github.com/Shebyyy/AnymeX-Extensions",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary",
    title: "AnymeX Extensions",
    description: "Browse and install extensions for AnymeX — all platforms, all repos, one place",
    images: ["/logo.png"],
  },
  other: {
    "github:repo": "https://github.com/Shebyyy/AnymeX-Extensions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-gray-100`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://anymex-extensions.vercel.app'),
  title: "AnymeX Guides",
  description: "Guides to help you set up and use AnymeX — install, configure, and start watching/reading.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "AnymeX Guides",
    description: "Guides to help you set up and use AnymeX — install, configure, and start watching/reading.",
    type: "website",
    url: "https://github.com/Shebyyy/AnymeX-Extensions",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AnymeX",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "AnymeX Guides",
    description: "Guides to help you set up and use AnymeX — install, configure, and start watching/reading.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "AnymeX",
      },
    ],
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

      </body>
    </html>
  );
}

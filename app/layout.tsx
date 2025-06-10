import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundBlurCircle from '@/components/ui/backgroundCircle';
import Image from 'next/image'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import MenuIcons from "@/components/ui/menu-icons"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenList AI",
  description: "Instantly generate actionable checklists for any task using artificial intelligence.",
  metadataBase: new URL("https://genlist.divinewton.com/"),
  openGraph: {
    images: '/genlist.png',
  },
  twitter: {
    images: '/genlist.png',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <BackgroundBlurCircle/><BackgroundBlurCircle />
        <MenuIcons />
        <div className="flex flex-col items-center px-4 pt-16">
            <a href="/" className="block">
            <Image 
              src="/logo.svg"
              alt="Logo"
              width={325}
              height={55}
              className="w-[250px] sm:w-[325px] h-auto"
              priority
            />
            </a>
        </div>
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        <footer className="w-full flex flex-wrap items-center justify-center relative py-6">
          <HoverCard>
            <HoverCardTrigger>
              <p className="text-secondary-foreground underline-offset-4 hover:underline cursor-pointer text-sm font-medium">©2025 Divi Newton</p>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col items-center justify-center">
                <p>Version 1.0.0</p>
                <a
                  href="https://github.com/divinewton/GenList-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <p>GitHub</p>
                  <Image 
                  src="/link.svg"
                  alt="GitHub"
                  width={18}
                  height={18}
                  />
                </a>
                <a
                  href="https://divinewton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <p>divinewton.com</p>
                  <Image 
                  src="/link.svg"
                  alt="divinewton.com"
                  width={18}
                  height={18}
                  />
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </footer>
      </body>
    </html>
  );
}

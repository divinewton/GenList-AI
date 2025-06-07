import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundBlurCircle from '@/components/ui/backgroundCircle';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'

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
  description: "Instantly generate actionable checklists for any task.",
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
        <div className="flex flex-col items-center px-4 pt-8 sm:pt-16">
          <a href="/">
            <Image 
              src="/logo.svg"
              alt="Logo"
              width={325}
              height={55}
            />
          </a>
        </div>
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        <footer className="w-full flex flex-wrap items-center justify-center relative py-6">
          <Button asChild type="submit" variant="link" className="self-start hover:scale-100 mx-auto">
            <Link href="https://www.divinewton.com" target="_blank">©2025 Divi Newton</Link>
          </Button>
          <div className="absolute right-6 flex items-center gap-2">
            <Button asChild type="submit" variant="ghost" className="self-start hover:scale-100 opacity-75">
              <Link href="https://github.com/divinewton/ai-checklist/releases/" target="_blank">v1.0.0</Link>
            </Button>
            <Button asChild type="submit" variant="ghost" size="icon" className="self-start hover:scale-100 opacity-75">
              <Link href="https://github.com/divinewton/ai-checklist" target="_blank">
                <Image 
                  src="/github.png"
                  alt="GitHub"
                  width={25}
                  height={25}
              />
              </Link>
            </Button>
          </div>
        </footer>
      </body>
    </html>
  );
}

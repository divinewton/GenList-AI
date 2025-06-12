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
import { ThemeProvider } from "@/components/theme-provider"
import { ExternalLink } from 'lucide-react';

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div className="dark:hidden">
          <BackgroundBlurCircle/>
          <BackgroundBlurCircle />
        </div>
        <MenuIcons />
        <div className="flex flex-col items-center px-4 pt-16">
            <a href="/" className="block">
              <Image 
                src="/logo.svg"
                alt="Logo"
                width={325}
                height={55}
                className="w-[250px] sm:w-[325px] h-auto block dark:hidden"
                priority
              />
              <Image 
                src="/logo-dark.svg"
                alt="Logo (dark mode)"
                width={325}
                height={55}
                className="w-[250px] sm:w-[325px] h-auto hidden dark:block"
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
                  <ExternalLink className="h-[1.125rem] w-[1.125rem] scale-100 " />
                </a>
                <a
                  href="https://divinewton.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <p>divinewton.com</p>
                  <ExternalLink className="h-[1.125rem] w-[1.125rem] scale-100 " />
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

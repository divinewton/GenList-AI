"use client"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from "next/link"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const task = searchParams.get("task") || ""

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
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
        <div className="flex flex-col items-center px-4 pt-10">
            <Card className="w-full max-w-xl transition-transform duration-0 hover:scale-100">
                <CardContent>
                <h1 className="text-2xl font-bold mb-4 text-center w-full">Your Checklist</h1>
                <p className="whitespace-pre-line break-words">{task}</p>
                </CardContent>
            </Card>
        </div>
        <div className="flex items-start justify-center pt-10">
            <Button
                asChild
                type="button"
                variant="default"
                className="self-start"
            >
                <Link href="/">Generate Another Checklist</Link>
            </Button>
        </div>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-6 mt-auto">
        <Button asChild type="submit" variant="link" className="self-start hover:scale-100">
          <Link href="https://www.divinewton.com" target="_blank">©2025 Divi Newton</Link>
        </Button>
      </footer>
    </div>
  )
}

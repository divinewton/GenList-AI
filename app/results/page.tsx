"use client"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from "next/link"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const task = searchParams.get("task") || "";
  const [checklist, setChecklist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!task) return;
    setLoading(true);
    setError(null);
    fetch("/api/generateChecklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch checklist");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setChecklist(data.checklist || []);
        // Debug: log the response
        if (!data.checklist || !Array.isArray(data.checklist)) {
          setError("Checklist not found in response.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [task]);

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
            <Card className="w-auto transition-transform duration-0 hover:scale-100">
                <CardContent>
                {loading && <p>Loading checklist...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && checklist.length === 0 && (
                  <p>No checklist generated.</p>
                )}
                {checklist.length > 1 && checklist[0]?.toLowerCase() === "not a task" && (
                  <p>Your input was not an actionable task. Please try again with a different prompt.</p>
                )}
                {checklist.length > 1 && checklist[0]?.toLowerCase() !== "not a task" && (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-center w-full">
                            {checklist[0]}
                        </h1>
                        <ul>
                            {checklist.slice(1).map((item, idx) => (
                                <li key={idx}>
                                    <div className="flex flex-row items-start gap-1 pb-2">
                                        <Image
                                            src="/check.svg"
                                            alt="Small Logo"
                                            width={25}
                                            height={25}
                                            className="opacity-100"
                                        />
                                        {item}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
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

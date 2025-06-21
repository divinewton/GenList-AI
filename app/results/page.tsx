"use client"
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from "next/link"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"

// Move all logic into a child component
function ResultsContent() {
  const searchParams = useSearchParams();
  const task = searchParams.get("task") || "";
  const [checklist, setChecklist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listSaved, setListSaved] = useState(false);

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

  useEffect(() => {
    if (checklist.length > 0 && checklist[0]?.toLowerCase() !== "not a task") {
      document.title = checklist[0] + " - GenList AI";
    } else {
      document.title = "Your Checklist - GenList AI";
    }
  }, [checklist]);

  // Type for a saved checklist
  interface SavedChecklist {
    id: string;
    title: string;
    items: string[];
    createdAt: number;
  }

  function saveChecklistToLocalStorage(checklist: string[]) {
    if (checklist.length < 2) return;
    const saved: SavedChecklist = {
      id: crypto.randomUUID(),
      title: checklist[0],
      items: checklist.slice(1),
      createdAt: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
    localStorage.setItem("savedChecklists", JSON.stringify([saved, ...existing]));
    setListSaved(true);
  }

  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex flex-col items-center px-4 pt-10">
          {loading && 
            <Image 
              src="/loading.gif"
              alt="Loading..." 
              width={100} 
              height={100} 
              className="opacity-75"
            />
          }
          {error && 
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
              <CardContent>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl text-muted-foreground mb-4 text-center w-full">
                Oops, it looks like there was an error...
                </h1>
                <Image
                  src="/error.svg"
                  alt="Error"
                  width={200}
                  height={200}
                  className="mb-4 opacity-75"
                />
                <p style={{ color: "red" }}>{error}</p>
              </div>
              </CardContent>
            </Card>
          }
          {!loading && !error && checklist.length === 0 && (
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
              <CardContent>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl text-muted-foreground mb-4 text-center w-full">
                Oops, it looks like there was an error...
                </h1>
                <Image
                  src="/error.svg"
                  alt="Error"
                  width={200}
                  height={200}
                  className="mb-4 opacity-75"
                  unoptimized
                />
                <p>No checklist generated.</p>
              </div>
              </CardContent>
            </Card>
          )}
          {checklist.length > 1 && checklist[0]?.toLowerCase() === "not a task" && (
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
              <CardContent>
                <p>Your input was not an actionable task. Please try again with a different prompt.</p>
              </CardContent>
            </Card>
          )}
          {checklist.length > 1 && checklist[0]?.toLowerCase() !== "not a task" && (
            <>
              <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5 pt-8">
                <CardContent>
                  <div className="flex items-center justify-center mb-4 w-full gap-4">
                    <h1 className="text-2xl font-bold text-center flex-1">
                      {checklist[0]}
                    </h1>
                    {listSaved == false && (
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Action"
                      onClick={() => saveChecklistToLocalStorage(checklist)}
                    >
                      Save
                    </Button>
                    )}
                    {listSaved == true && (
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Saved"
                      disabled
                      className="opacity-50 pointer-events-none"
                    >
                      Saved
                      <Check></Check>
                    </Button>
                    )}
                  </div>
                  <ul>
                    <li>
                      <div className="flex flex-row items-center gap-2 pb-3">
                        <Checkbox checked />
                        <p>Generate a checklist with GenList AI</p>
                      </div>
                    </li>
                    {checklist.slice(1).map((item, idx) => (
                    <li key={idx}>
                      <div className="flex flex-row items-center gap-2 pb-3">
                        <Checkbox />
                        {item}
                      </div>
                    </li>
                    ))}
                  </ul>
                  <div className="text-sm text-center mt-2 opacity-50">
                    <p>Generated by Google Gemini 2.0 Flash</p>
                  </div>
                </CardContent>
            </Card>
            </>
          )}
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
    </div>
  )
}

// Default export wraps ResultsContent in Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Image src="/loading.gif" alt="Loading..." width={100} height={100} className="opacity-75" /></div>}>
      <ResultsContent />
    </Suspense>
  );
}
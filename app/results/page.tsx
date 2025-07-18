"use client"
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, CircleX, Download, FileCheck } from "lucide-react"
import LoadingCircleSpinner from "@/components/ui/loadingCircle"
import { toast } from "sonner"
import EditSheet from "@/components/ui/edit-sheet";


function ResultsContent() {
  const searchParams = useSearchParams();
  const task = searchParams.get("task");
  const listId = searchParams.get("list");
  const [checklist, setChecklist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedSavedChecklist, setLoadedSavedChecklist] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (task) {
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
          setChecklist(data.checklist || []);
          if (!data.checklist || !Array.isArray(data.checklist)) {
            setError("Checklist not found in response.");
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else if (listId) {
      setLoading(true);
      setError(null);
      Promise.resolve().then(() => {
        const saved = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
        const found = saved.find((item: any) => item.id === listId);
        if (found) {
          setLoadedSavedChecklist(found);
        } else {
          setError("Checklist not found.");
        }
      }).finally(() => setLoading(false));
    } else if (!task && !listId) {
      router.push("/saved");
    }
  }, [task, listId]);

  useEffect(() => {
    if (checklist.length > 0 && checklist[0]?.toLowerCase() !== "not a task") {
      document.title = checklist[0] + " - GenList AI";
    } else if (loadedSavedChecklist) {
      document.title = loadedSavedChecklist.title + " - GenList AI";
    } else {
      document.title = "Your Checklist - GenList AI";
    }
  }, [checklist, loadedSavedChecklist]);

  // Type for a saved checklist
  interface SavedChecklist {
    id: string;
    title: string;
    category: number;
    items: string[];
    createdAt: number;
  }

  function saveChecklistToLocalStorage(checklist: string[]) {
    if (checklist.length < 2) return;
    const saved: SavedChecklist = {
      id: crypto.randomUUID(),
      title: checklist[0],
      category: Number(checklist[1]),
      items: checklist.slice(2),
      createdAt: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
    localStorage.setItem("savedChecklists", JSON.stringify([saved, ...existing]));
    router.replace("/results?list=" + saved.id);
    toast("Checklist Saved", {
      description: checklist[0],
      icon: <Download className="text-primary" />,
    });
    setChecklist([]);
  }

  function updateSavedChecklist() {
    const updatedSaved = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
    const reloaded = updatedSaved.find((item: any) => item.id === loadedSavedChecklist.id);
    if (
      reloaded &&
      JSON.stringify(reloaded) !== JSON.stringify(loadedSavedChecklist)
    ) {
      setLoadedSavedChecklist(reloaded);
      toast("Checklist Updated", {
        description: loadedSavedChecklist.title,
        icon: <FileCheck className="text-primary" />,
      });
    }
  }

  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex flex-col items-center px-4 pt-10">
          {loading && 
            <LoadingCircleSpinner></LoadingCircleSpinner>
          }
          {error && 
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
              <CardContent>
                <div className="flex flex-col items-center">
                  <p>Oops, it looks like there was an error...</p>
                  <div className="flex gap-2 items-center justify-center pt-2">
                    <CircleX className="text-destructive size-4"></CircleX>
                    <p className="text-destructive">{error}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
          {checklist.length > 1 && checklist[0]?.toLowerCase() === "not a task" && (
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
              <CardContent>
                <p>Your input was not an actionable task. Please try again with a different prompt.</p>
              </CardContent>
            </Card>
          )}
          {/* Render generated checklist if task param exists */}
          {task && checklist.length > 1 && checklist[0]?.toLowerCase() !== "not a task" && (
            <>
              <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5 pt-8">
                <CardContent>
                  <div className="flex items-center justify-center mb-4 w-full gap-4 col-button">
                    <h1 className="text-2xl font-bold text-center flex-1">
                      {checklist[0]}
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Save"
                      onClick={() => saveChecklistToLocalStorage(checklist)}
                    >
                      Save
                      <Download size={16} />
                    </Button>
                  </div>
                  <ul>
                    {checklist[1] !== "1" && (
                      <li>
                        <div className="flex flex-row items-center gap-2 pb-3">
                          <Checkbox checked />
                          <p>Generate a checklist with GenList AI</p>
                        </div>
                      </li>
                    )}
                    {checklist.slice(2).map((item, idx) => (
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
          {/* Render saved checklist if list param exists and not task */}
          {!task && listId && loadedSavedChecklist && (
            <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5 pt-8">
              <CardContent>
                <div className="flex items-center justify-center mb-4 w-full gap-4 col-button">
                  <h1 className="text-2xl font-bold text-center flex-1">
                    {loadedSavedChecklist.title}
                  </h1>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Saved"
                      disabled
                      className="opacity-50 pointer-events-none"
                    >
                      <Check size={16}></Check>
                    </Button>
                    <EditSheet 
                      checklistID={loadedSavedChecklist.id}
                      onClose={() => updateSavedChecklist()}
                    >
                    </EditSheet>
                  </div>
                </div>
                <ul>
                  {loadedSavedChecklist.category !== 1 && (
                    <li>
                      <div className="flex flex-row items-center gap-2 pb-3">
                        <Checkbox checked />
                        <p>Generate a checklist with GenList AI</p>
                      </div>
                    </li>
                  )}
                  {loadedSavedChecklist.items.map((item: string, idx: number) => (
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
          )}
        </div>
        {!loading && (
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
        )}
      </main>
    </div>
  )
}

// Default export wraps ResultsContent in Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><LoadingCircleSpinner></LoadingCircleSpinner></div>}>
      <ResultsContent />
    </Suspense>
  );
}
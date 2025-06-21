"use client"
import { ChecklistCard } from "@/components/ChecklistCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function SavedContent() {
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
        setSaved(data);
    }, []);

    function handleDelete(id: string) {
        setSaved((prev) => prev.filter((item: any) => item.id !== id));
    }

    return (
        <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
            <main>
                <div className="flex flex-col items-center px-4 pt-10 pb-4">
                    <h1 className="text-2xl font-bold mb-4 text-center w-full">
                        Saved Checklists
                    </h1>
                    <div className="flex items-center justify-center flex-wrap gap-5">
                        {saved.length === 0 && 
                            <>
                            <div className="flex flex-col items-center w-full">
                                <Card className="w-auto transition-transform duration-0 hover:scale-100 p-5">
                                    <CardContent>
                                        <p>You don't have any saved checklists yet. Generate a checklist and click "Save" to access it later!</p>
                                    </CardContent>
                                </Card>
                                <Button
                                    asChild
                                    type="button"
                                    variant="default"
                                    className="mt-6"
                                >
                                    <Link href="/">Generate a Checklist</Link>
                                </Button>
                            </div>
                            </>
                        }
                        {saved.map((item: any) => (
                            <ChecklistCard  
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                category={1}
                                date={new Date(item.createdAt).toLocaleDateString()}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Default export wraps SavedContent in Suspense
export default function SavedPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Image src="/loading.gif" alt="Loading..." width={100} height={100} className="opacity-75" /></div>}>
      <SavedContent />
    </Suspense>
  );
}
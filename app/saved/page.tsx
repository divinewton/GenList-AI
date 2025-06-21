"use client"
import { ChecklistCard } from "@/components/ChecklistCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SavedContent() {
    const [saved, setSaved] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
        setSaved(data);
    }, []);

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
                            <p className="text-muted-foreground">No saved checklists yet.</p>
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
                            </>
                        }
                        {saved.map((item: any) => (
                            <ChecklistCard  
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                category={1}
                                date={new Date(item.createdAt).toLocaleDateString()}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
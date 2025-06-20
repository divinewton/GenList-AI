"use client"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { ChecklistCard } from "@/components/ChecklistCard";

export default function SavedContent() {
    return (
        <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
            <main>
                <div className="flex flex-col items-center px-4 pt-10 pb-4">
                        <CardContent>
                            <h1 className="text-2xl font-bold mb-4 text-center w-full">
                                Saved Checklists
                            </h1>
                            <div className="flex items-center justify-center flex-wrap gap-5">
                                {[1,2,3,4,5,6].map((item) => (
                                    <ChecklistCard  
                                        key={item}
                                        title={`Checklist ${item}`} 
                                        category={item}
                                        id={item.toString()}
                                    />
                                ))}
                            </div>
                        </CardContent>
                </div>
            </main>
        </div>
    );
}
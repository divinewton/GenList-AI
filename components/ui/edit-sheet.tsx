"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import LoadingCircleSpinner from "@/components/ui/loadingCircle"
import { CircleX } from "lucide-react"


interface EditSheetProps {
    checklistID: number;
}

export default function EditSheet({ checklistID }: EditSheetProps) {
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
        setSaved(data);
        setLoading(false);
    }, []);

    const loadedSavedChecklist = saved.find((item: any) => item.id === checklistID) || {};

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Edit"
                >
                    Edit
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit checklist</SheetTitle>
                    <SheetDescription>
                        Remove and add items to your generated checklist below.
                    </SheetDescription>
                </SheetHeader>
                {loading ? (
                    <LoadingCircleSpinner></LoadingCircleSpinner>
                ) : (
                    <div className="flex flex-col flex-1 overflow-y-auto max-h-[80vh]">
                        <div className="p-4 flex-1">
                            <ul>
                                {loadedSavedChecklist.category !== 1 && (
                                    <li>
                                        <div className="flex flex-row items-center gap-2 pb-3">
                                            <Checkbox checked />
                                            <p>Generate a checklist with GenList AI</p>
                                        </div>
                                    </li>
                                )}
                                {(loadedSavedChecklist.items || []).map((item: string, idx: number) => (
                                    <li key={idx}>
                                        <div className="flex flex-row items-center gap-2 pb-3">
                                            <CircleX 
                                                size={20} 
                                                className="text-destructive cursor-pointer hover:text-destructive/50"
                                                onClick={() => deleteCheck(idx)}
                                            />
                                            {item}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button>Done</Button>
                          </SheetClose>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
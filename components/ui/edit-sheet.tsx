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
import LoadingCircleSpinner from "@/components/ui/loadingCircle"
import { Trash2, Pencil } from "lucide-react"

interface EditSheetProps {
    checklistID: number;
    onClose?: () => void;
}

export default function EditSheet({ checklistID, onClose }: EditSheetProps) {
    const [saved, setSaved] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedSavedChecklist, setLoadedSavedChecklist] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen);
        if (!isOpen && onClose) {
            onClose();
        }
    }
    
    useEffect(() => {
        setLoading(true);
        const data = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
        setSaved(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoadedSavedChecklist(saved.find((item: any) => item.id === checklistID) || {});
    }, [saved, checklistID]);

  function deleteCheck(idx: number) {
     if (loadedSavedChecklist && loadedSavedChecklist.items.length > 0) {
      const updatedChecklist = {
        ...loadedSavedChecklist,
        items: loadedSavedChecklist.items.filter((_: string, i: number) => i !== idx),
      };
      // Update localStorage
      const saved = JSON.parse(localStorage.getItem("savedChecklists") || "[]");
      const updatedSaved = saved.map((item: any) =>
        item.id === loadedSavedChecklist.id ? updatedChecklist : item
      );
      localStorage.setItem("savedChecklists", JSON.stringify(updatedSaved));
      // Reload the checklist from localStorage to ensure state is in sync
      const reloaded = updatedSaved.find((item: any) => item.id === loadedSavedChecklist.id);
      setLoadedSavedChecklist(reloaded);
    }
  }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    aria-label="Edit"
                >
                    Edit
                    <Pencil size={16} />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full max-w-full sm:max-w-sm pr-4 pl-4 sm:pr-1 sm:pl-1">
                <SheetHeader className="pb-0">
                    <SheetTitle>Edit checklist</SheetTitle>
                    <SheetDescription>
                        Remove and add items to your generated checklist below.
                    </SheetDescription>
                </SheetHeader>
                {loading ? (
                    <LoadingCircleSpinner></LoadingCircleSpinner>
                ) : (
                <div className="flex p-4 overflow-y-auto">
                    <ul>
                        {(loadedSavedChecklist.items || []).map((item: string, idx: number) => (
                        <li key={idx}>
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <span className="w-5 flex-shrink-0 flex justify-center">
                                    <Trash2 
                                        size={20} 
                                        className="text-destructive/75 cursor-pointer hover:text-destructive/50"
                                        onClick={() => deleteCheck(idx)}
                                    />
                                </span>
                                <span>{item}</span>
                            </div>
                            {idx < (loadedSavedChecklist.items?.length || 0) - 1 && (
                                <hr className="border-t border-border w-full mb-2" />
                            )}
                        </li>
                        ))}
                    </ul>
                </div>
                )}
                <SheetFooter className="pt-0">
                    <SheetClose asChild>
                        <Button>Done</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
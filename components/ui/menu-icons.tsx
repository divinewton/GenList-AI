"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Folder } from "lucide-react"

export default function MenuIcons() {
  return (
    <div className="absolute top-6 right-6 flex gap-3 z-30">
      <Link href="/saved" aria-label="Saved">
        <Button variant="default" size="icon">
          <Folder />
        </Button>
      </Link>
      <ModeToggle></ModeToggle>
    </div>
  );
}

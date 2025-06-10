"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image'

export default function MenuIcons() {
  return (
    <div className="absolute top-6 right-6 flex gap-3 z-30">
      <Link href="/saved" aria-label="Saved">
        <Button variant="default" size="icon" className="rounded-full">
          <Image 
            src="/saved.svg"
            alt="Saved"
            width={20}
            height={20}
          />
        </Button>
      </Link>
      <Link href="/settings" aria-label="Settings">
        <Button variant="default" size="icon" className="rounded-full">
          <Image 
            src="/settings.svg"
            alt="Settings"
            width={20}
            height={20}
          />
        </Button>
      </Link>
    </div>
  );
}

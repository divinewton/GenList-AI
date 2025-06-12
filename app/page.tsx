"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ExampleCard from "@/components/ui/example-card"
import EnterTaskCard from "@/components/ui/enter-task-card"

export default function Home() {
  const [input, setInput] = useState("")
  const router = useRouter()

  return (
    <div className="flex flex-col font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex flex-col items-center px-4">
          <p className="text-lg text-muted-foreground mt-5 text-center max-w-2xl mb-10">
            Instantly generate actionable checklists for any task. Just describe what you want to accomplish and let AI break it down for you!
          </p>
        </div>
        <div className="flex gap-5 flex-wrap items-center px-4 justify-center">
          <ExampleCard
            title="Packing for a Camping Trip"
            description="Get a detailed packing list for your trip, including everything you'll need."
            icon="/camping.svg"
            iconDark="/camping-dark.svg"
            alt="Packing List"
            task="Packing for a Camping Trip"
          />
          <ExampleCard
            title="Preparing for an Interview"
            description="Get an in-depth interview preparation guide to help you be prepare."
            icon="/interview.svg"
            iconDark="/interview-dark.svg"
            alt="Interview Prep"
            task="Preparing for an Interview"
          />
          <ExampleCard
            title="Organizing my Office"
            description="Get a step-by-step plan to help you organize your workspace efficiently."
            icon="/office.svg"
            iconDark="/office-dark.svg"
            alt="Organizing Office"
            task="Organizing my Office"
          />
        </div>
        <EnterTaskCard
          input={input}
          setInput={setInput}
          onSubmit={() => {
            if (input.trim()) {
              router.push(`/results?task=${encodeURIComponent(input)}`)
            }
          }}
        />
      </main>
    </div>
  );
}

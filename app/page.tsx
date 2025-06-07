"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ExampleCard from "@/components/ui/example-card"

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
            alt="Packing List"
            task="Packing for a Camping Trip"
          />
          <ExampleCard
            title="Preparing for an Interview"
            description="Get an in-depth interview preparation guide to help you be prepare."
            icon="/interview.svg"
            alt="Interview Prep"
            task="Preparing for an Interview"
          />
          <ExampleCard
            title="Organizing my Office"
            description="Get a step-by-step plan to help you organize your workspace efficiently."
            icon="/office.svg"
            alt="Organizing Office"
            task="Organizing my Office"
          />
        </div>
        <div className="flex items-start justify-center pt-10">
          <Card className="w-full max-w-xl transition-transform duration-0 hover:scale-100">
            <CardHeader>
              <CardTitle>Generate a checklist for any task!</CardTitle>
              <Textarea
                placeholder="Describe your task here"
                id="prompt"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-start"
                onClick={() => {
                  if (input.trim()) {
                    router.push(`/results?task=${encodeURIComponent(input)}`)
                  }
                }}
              >
                Generate Checklist
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}

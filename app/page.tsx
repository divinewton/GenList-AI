import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import Link from "next/link"
import FloatingChecklistItem from "@/components/ui/FloatingChecklistItem"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex flex-col items-center px-4 pt-8 sm:pt-16">
          <Image 
            src="/logo.svg"
            alt="Logo"
            width={350}
            height={55}
          />
          <p className="text-lg text-muted-foreground mt-10 text-center max-w-2xl mb-10">
            Instantly generate actionable checklists for any task. Just describe what you want to accomplish and let AI break it down for you!
          </p>
        </div>
        <div className="flex gap-5 flex-wrap items-center px-4 justify-center">
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Packing for a Camping Trip</CardTitle>
              <CardDescription>
                I'm packing for a three-day car-camping trip by a lake in the mountains. It's supposed to be sunny but highs in the 50s and 60s.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" variant="default" className="w-full">
                Generate Checklist
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Preparing for an Interview</CardTitle>
              <CardDescription>
                I'm preparing for a job interview for a marketing specialist position at a tech startup. The interview is next week with two hiring managers.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" variant="default" className="w-full">
                Generate Checklist
              </Button>
            </CardFooter>
          </Card>
          <Card className="w-full max-w-xs">
            <CardHeader>
              <CardTitle>Organizing my Office</CardTitle>
              <CardDescription>
                I'm reorganizing my home office space to be more functional and clutter-free. My work involves a lot of computer use and occasional paperwork.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" variant="default" className="w-full">
                Generate Checklist
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex items-start justify-center pt-10">
          <Card className="w-full max-w-xl transition-transform duration-0 hover:scale-100">
            <CardHeader>
              <CardTitle>Generate a checklist for any task!</CardTitle>
              <Textarea placeholder="Describe your task here" id="message-2" />
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" variant="default" className="self-start">
                Generate Checklist
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* <div className="absolute top-0 left-0 w-full h-0 -z-10">
          <FloatingChecklistItem left="5rem" top="5rem" text="do the laundry"/>
          <FloatingChecklistItem left="65rem" top="8rem" text="buy groceries"/>
          <FloatingChecklistItem left="8rem" top="12rem" text="call mom"/>
          <FloatingChecklistItem left="68rem" top="30rem" text="finish report"/>
          <FloatingChecklistItem left="8rem" top="32rem" text="check the weather"/>
          <FloatingChecklistItem left="60rem" top="40rem" text="find passport"/>
        </div> */}
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-6 mt-auto">
        <Button asChild type="submit" variant="link" className="self-start hover:scale-100">
          <Link href="https://www.divinewton.com" target="_blank">©2025 Divi Newton</Link>
        </Button>
      </footer>
    </div>
  );
}

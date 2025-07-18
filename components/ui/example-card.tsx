"use client"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ExampleCard({
  title,
  description,
  icon,
  iconDark,
  alt,
  task
}: {
  title: string,
  description: string,
  icon: string,
  iconDark: string,
  alt: string,
  task: string
}) {
  const router = useRouter()
  return (
    <Card
      className="w-full max-w-xs cursor-pointer hover:bg-background/50 relative overflow-hidden"
      onClick={() => {
        router.push(`/results?task=${encodeURIComponent(task)}`)
      }}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(`/results?task=${encodeURIComponent(task)}`)
        }
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none dark:hidden"
        style={{
          background: "linear-gradient(198deg, rgba(88, 219, 174, 0.50) -1.92%, rgba(88, 219, 174, 0.00) 61.42%)",
          opacity: 0.5
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
        style={{
          background: "linear-gradient(198deg, rgba(73, 162, 131, 0.30) -1.92%, rgba(36, 168, 122, 0.00) 61.42%)",
          opacity: 0.5
        }}
      />
      <CardHeader className="relative z-10">
        <div className="flex items-center mb-2 dark:hidden">
          <Image
            src={icon}
            alt={alt}
            width={40}
            height={40}
          />
        </div>
        <div className="items-center mb-2 hidden dark:flex">
          <Image
            src={iconDark}
            alt={alt}
            width={40}
            height={40}
          />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

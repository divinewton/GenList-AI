import { Card, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function EnterTaskCard({
  input,
  setInput,
  onSubmit,
}: {
  input: string,
  setInput: (val: string) => void,
  onSubmit: () => void
}) {
  return (
    <div className="flex items-start justify-center pt-10 px-5 md:px-10 enter-task-sticky max-w-full">
      <Card className="w-full max-w-2xl transition-transform duration-0 hover:scale-100">
        <CardHeader>
          <div className="flex flex-row gap-3 items-center justify-center w-full">
            <Textarea
              placeholder="Generate a checklist for any task..."
              id="prompt"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="self-end flex-1 w-full"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit();
                }
              }}
            />
            <Button
              type="button"
              variant="default"
              className="self-end"
              onClick={onSubmit}
              size="icon"
            >
              <Image 
                src="/send.svg"
                alt="Send"
                width={18}
                height={18}
              />
          </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

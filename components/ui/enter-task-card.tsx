import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendHorizontal } from 'lucide-react';

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
        <CardContent>
          <div className="w-full flex justify-center items-center">
            <div className="relative w-full">
              <Textarea
                placeholder="Generate a checklist for any task..."
                id="prompt"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 w-full rounded-xl pr-12"
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
                className="absolute bottom-2 right-2"
                onClick={onSubmit}
                size="icon"
              >
                <SendHorizontal className="h-[2rem] w-[2rem] scale-100 " />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

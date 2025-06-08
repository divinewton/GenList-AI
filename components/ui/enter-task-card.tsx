import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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
    <div className="flex items-start justify-center pt-10">
      <Card className="w-full max-w-2xl transition-transform duration-0 hover:scale-100">
        <CardHeader>
          <CardTitle>Generate a checklist for any task!</CardTitle>
          <div className="flex items-center justify-center">
            <Textarea
                placeholder="Describe your task here"
                id="prompt"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button
            type="button"
            variant="default"
            className="self-start"
            onClick={onSubmit}
          >
            Generate Checklist
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  let task: string;
  try {
    const body = await req.json();
    task = body.task;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!task) {
    return NextResponse.json({ error: "Task is required" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });
const prompt = `
You are a helpful assistant that creates checklists, but you also validate your input. Your first step is to analyze the user-defined task: "${task}".

**Input Validation:**
If the input is not an actionable task that can be broken down into a checklist (for example, if it is a simple greeting like "hi", a question like "how are you?", or a nonsensical statement), then you must stop and your entire response must be the exact following:
[
  "not a task",
  "not a task"
]
Do not provide any other text, explanation, or JSON if the input is not a valid task.

**Checklist Generation:**
If, and only if, the input is an actionable task, you must generate a checklist by following these instructions precisely:

1.  The entire output must be a single, valid JSON array of strings. Do not include any text or markdown formatting before or after the JSON array.
2.  The very first string in the array must be a clear and concise title for the checklist.
3.  All subsequent strings in the array must be the individual checklist items.
4.  The array should contain a total of 21 to 51 strings (1 for the title, plus 20 to 50 for the checklist items).
5.  Each checklist item should be a short, distinct, and actionable step.
6.  Do not include any section headings or subtitles as separate items in the array.

Here is an example of the required output format for a valid task:
[
  "Weekly Kitchen Deep Clean",
  "Clear all countertops of clutter.",
  "Wipe down all countertops with a multi-surface cleaner.",
  "Clean and disinfect the sink and faucet.",
  "Empty and clean the refrigerator, checking for expired food.",
  "Wipe down all refrigerator shelves and drawers."
]

Now, process the task and respond according to all of the instructions above.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    // Log the raw response for debugging
    console.log("Gemini API response:", JSON.stringify(response));

    // Extract checklist from response.text
    let checklist: string[] = [];
    try {
      let text = response.text;
      if (typeof text !== "string") {
        return NextResponse.json({ error: "Checklist is missing or not a string", raw: text }, { status: 500 });
      }
      // Remove Markdown code block if present
      text = text.trim();
      if (text.startsWith("```")) {
        // Remove the first line (```json or ```)
        text = text.replace(/^```[a-zA-Z]*\n/, "");
        // Remove the last line (```)
        text = text.replace(/\n```$/, "");
      }
      checklist = JSON.parse(text);
      if (
        !Array.isArray(checklist) ||
        checklist.length < 2 ||
        typeof checklist[0] !== "string" ||
        !checklist.slice(1).every(item => typeof item === "string")
      ) {
        throw new Error("Checklist is not in the expected array format");
      }
    } catch {
      return NextResponse.json({ error: "Checklist is not valid JSON or not in expected format", raw: response.text }, { status: 500 });
    }

    return NextResponse.json({ checklist });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate checklist", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

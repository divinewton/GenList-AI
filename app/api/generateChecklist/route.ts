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
You are a helpful assistant that creates checklists and strictly validates user input. Follow these instructions exactly:

**Input Validation:**
- Analyze the user-defined task: "${task}".
- If the input is NOT an actionable task that can be broken down into a checklist (e.g., a greeting, question, or nonsensical statement), your ENTIRE response must be:
[
  "not a task",
  "not a task"
]
- Do NOT provide any other text, explanation, or formatting if the input is not a valid task.

**Checklist Generation:**
If, and only if, the input is an actionable task, generate a checklist as follows:

1. Output a single, valid JSON array of strings. Do NOT include any text, markdown, or code block formatting before or after the array.
2. The first string must be a clear, concise title for the checklist, ending with the type of list ("Packing List", "Shopping List", "To-Do List", or "Checklist").
3. The second string must be a single number (as a string) representing the category:
   - "1" for Packing List
   - "2" for Shopping List
   - "3" for To-Do List
   - "4" for any other type of Checklist
   (Only include the number, no extra text or symbols.)
4. All following strings must be short, distinct, actionable checklist items.
5. The array must have 6 to 51 strings (1 title, 1 category, 4-49 items).
6. Do NOT include section headings, subtitles, or explanations as items.
7. Do NOT use markdown, code blocks, or any formatting outside the JSON array.

**Example of valid output:**
[
  "Weekly Kitchen Deep Clean Checklist",
  "1",
  "Clear all countertops of clutter.",
  "Wipe down all countertops with a multi-surface cleaner.",
  "Clean and disinfect the sink and faucet.",
  "Empty and clean the refrigerator, checking for expired food.",
  "Wipe down all refrigerator shelves and drawers."
]

Now, process the task and respond according to ALL instructions above. Output ONLY the JSON array or the exact ["not a task", "not a task"] if invalid.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

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
        text = text.replace(/^```[a-zA-Z]*\n/, "");
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

import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  console.log(
    "ANTHROPIC_API_KEY present:",
    !!process.env.ANTHROPIC_API_KEY,
    "| first 8 chars:",
    process.env.ANTHROPIC_API_KEY?.slice(0, 8) ?? "undefined"
  );

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const data = await request.json();

    const {
      projectName,
      clientName,
      projectType,
      keyDeliverables,
      timelineWeeks,
      revisionRounds,
      yourName,
      yourEmail,
    } = data;

    if (!projectName || !clientName || !yourName) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const prompt = `You are a professional freelance consultant. Generate a formal Scope of Work (SOW) document based on the following project details.

Project Name: ${projectName}
Client Name: ${clientName}
Project Type: ${projectType}
Key Deliverables: ${keyDeliverables}
Project Timeline: ${timelineWeeks} weeks
Number of Revision Rounds: ${revisionRounds}
Freelancer/Company: ${yourName}
Contact Email: ${yourEmail}

Generate a professional, legally-minded Scope of Work document with exactly these seven sections in this order. Prefix each section heading with "## " (e.g. "## Project Overview"). Write in a formal, professional tone suitable for a client contract. Use "- " to start each bullet point. Be specific and thorough using the project details provided. Output only the document — no preamble, no explanation, nothing before or after.

Sections:
1. Project Overview
2. Scope of Work
3. Deliverables
4. Timeline
5. Revision Policy
6. Payment Terms
7. Acceptance`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ document: text });
  } catch (err) {
    console.error("generate-sow error:", err);
    return Response.json(
      { error: "Failed to generate document. Please try again." },
      { status: 500 }
    );
  }
}

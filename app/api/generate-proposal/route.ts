import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const data = await request.json();

    const {
      yourName,
      yourEmail,
      clientName,
      clientCompany,
      projectTitle,
      typeOfWork,
      projectDescription,
      proposedSolution,
      timelineWeeks,
      totalPrice,
      revisionRounds,
    } = data;

    if (!yourName || !clientName || !projectTitle) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert freelance consultant who writes persuasive, professional proposals that win clients. Write a compelling freelance proposal based on these details:

Freelancer: ${yourName}
Freelancer Email: ${yourEmail}
Client Name: ${clientName}
Client Company: ${clientCompany || "their company"}
Project Title: ${projectTitle}
Type of Work: ${typeOfWork}
What the Client Needs: ${projectDescription}
Proposed Solution: ${proposedSolution}
Project Timeline: ${timelineWeeks} weeks
Total Investment: $${totalPrice} USD
Revision Rounds Included: ${revisionRounds}

Write a professional, warm, and persuasive proposal. The tone should be confident but not arrogant — focus on the client's goals and how this project will benefit them. Prefix each section heading with "## " (e.g. "## Introduction"). Use "- " for bullet points. Output only the proposal document — no preamble, no commentary, nothing before or after.

Sections in this exact order:
1. Introduction
2. Understanding of Your Needs
3. Proposed Solution
4. Deliverables
5. Timeline
6. Investment
7. Revision Policy
8. Next Steps`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return Response.json({ document: text });
  } catch (err) {
    console.error("generate-proposal error:", err);
    return Response.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    );
  }
}

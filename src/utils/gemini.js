// Gemini API Orchestration and Integration
// Communicates with Google Gemini API directly using a secure browser fetch.
// Provides structured JSON schemas, prompt templates, and fallback mock capabilities.

import { mockIdeas } from "../data/mockData";

// Safe API caller using direct fetch to avoid client-side Node polyfill errors
async function callGemini(apiKey, promptText, expectJson = true) {
  const modelName = "gemini-3.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptText
          }
        ]
      }
    ],
    generationConfig: expectJson ? { responseMimeType: "application/json" } : {}
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Empty response returned from Gemini API");
    }

    if (expectJson) {
      return JSON.parse(resultText);
    }
    return resultText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// Stage 1: Intake parsing
export async function runIntakeStage(apiKey, ideaText, ideaType, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage1 : mockIdeas[0].stage1;
  }

  const promptText = `
You are an expert venture intake assistant. Analyze the following project idea description and category.
Extract the structured business validation elements. Return a valid JSON object only.

Idea Description: "${ideaText}"
Idea Category (User Chosen): "${ideaType}"

Format output as a single JSON object with EXACTLY the following fields:
{
  "problem": "A concise statement of the core problem or pain point being solved (max 3 sentences).",
  "targetUser": "The specific target demographic or buyer persona (max 2 sentences).",
  "valueProposition": "A compelling description of the unique value proposition (max 2 sentences).",
  "ideaType": "Standardized category (use 'Product/SaaS', 'Content/Creator', 'Local Service', or 'Research/Nonprofit')",
  "subDomain": "A specific niche subdomain classification (e.g. 'B2B Fintech', 'EdTech Hub', 'D2C Sustainable Food')",
  "summary": "A 1-sentence executive summary of the venture."
}
`;
  return callGemini(apiKey, promptText, true);
}

// Stage 2: Assumptions & Risks
export async function runRisksStage(apiKey, intakeData, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage2 : mockIdeas[0].stage2;
  }

  const promptText = `
You are a conservative risk analyst. Analyze this parsed business intake data:
Problem: "${intakeData.problem}"
Target User: "${intakeData.targetUser}"
Value Prop: "${intakeData.valueProposition}"
Category: "${intakeData.ideaType}" (${intakeData.subDomain})

Generate a risk register of exactly 3 crucial risks/assumptions that must be validated first before building.
Return a valid JSON array of objects. Each object must have EXACTLY the following fields:
[
  {
    "id": "r1",
    "name": "Name of the risk (short, 3-5 words)",
    "category": "Classification (e.g. 'Market Risk', 'Technical Risk', 'Financial Risk', 'Operational Risk')",
    "impact": "Severity level ('High' or 'Medium' or 'Low')",
    "mitigation": "A highly concrete, actionable validation strategy to mitigate or test this risk (1-2 sentences).",
    "status": "Unresolved"
  },
  ...
]
`;
  return callGemini(apiKey, promptText, true);
}

// Stage 3: Scenario Simulation
export async function runSimulationStage(apiKey, intakeData, risks, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage3 : mockIdeas[0].stage3;
  }

  const promptText = `
You are a business coach simulating a panel of three distinct advisors reviewing an idea.
Advisors:
1. Clara 'The Catalyst' Chen (Optimist): Passionate champion, looks for growth, network effects, and high potential.
2. Marcus 'The Auditor' Vance (Skeptical Expert): Focuses on implementation roadblocks, high costs, user churn, and failure modes.
3. Sarah 'The Pragmatist' Miller (Realist Advisor): Focuses on lean validation, cheap MVPs, manual workarounds, and step-by-step progress.

Business Idea:
Summary: "${intakeData.summary}"
Value Prop: "${intakeData.valueProposition}"
Risks: ${JSON.stringify(risks)}

Return a JSON object containing exactly three entries for 'optimist', 'skeptic', and 'realist'.
Format output as EXACTLY:
{
  "optimist": {
    "name": "Clara 'The Catalyst' Chen",
    "role": "Optimistic Venture Strategist",
    "quote": "A single bold quote showing excitement (1 sentence).",
    "feedback": "Encouraging, high-upside feedback and suggestions (2-3 sentences).",
    "sentiment": "positive"
  },
  "skeptic": {
    "name": "Marcus 'The Auditor' Vance",
    "role": "Skeptical Operations Analyst",
    "quote": "A critical quote pointing directly at a roadblock (1 sentence).",
    "feedback": "Tough, critical feedback highlighting exact failure scenarios (2-3 sentences).",
    "sentiment": "negative"
  },
  "realist": {
    "name": "Sarah 'The Pragmatist' Miller",
    "role": "Lean Validation Consultant",
    "quote": "A level-headed quote advising caution and lean tactics (1 sentence).",
    "feedback": "Actionable, sensible recommendations on what to build or verify first (2-3 sentences).",
    "sentiment": "neutral"
  }
}
`;
  return callGemini(apiKey, promptText, true);
}

// Stage 4: Synthesis (30/60/90 Day Plan)
export async function runSynthesisStage(apiKey, intakeData, risks, simulation, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage4 : mockIdeas[0].stage4;
  }

  const promptText = `
You are a lean startup planner. Create a 30/60/90 Day validation plan for this startup idea:
Value Prop: "${intakeData.valueProposition}"
Core Risks: ${JSON.stringify(risks)}
Advisors Feedback:
- Skeptic: "${simulation.skeptic.feedback}"
- Realist: "${simulation.realist.feedback}"

Output a realistic milestone and validation schedule. Return a JSON object with EXACTLY the following structure:
{
  "plan30": {
    "title": "Short title describing Days 1-30 focus",
    "experiments": [
      "A concrete validation experiment (e.g. landing page test, survey, manual delivery) to run in the first 30 days.",
      "Another low-cost experiment targeting the top risk."
    ],
    "milestones": [
      "Specific quantitative target for Day 30 (e.g., '100 signups', '3 customer interviews').",
      "Qualitative operational milestone."
    ],
    "confidence": "Current rating for this phase ('High' or 'Medium' or 'Low')"
  },
  "plan60": {
    "title": "Short title describing Days 31-60 focus",
    "experiments": [
      "An experiment building on the first phase (e.g., interactive mockup, manual concierge pilot).",
      "Operational verification experiment."
    ],
    "milestones": [
      "Day 60 quantitative milestone (e.g., '5 active pilot users').",
      "Process milestone."
    ],
    "confidence": "Current rating ('High' or 'Medium' or 'Low')"
  },
  "plan90": {
    "title": "Short title describing Days 61-90 focus",
    "experiments": [
      "An experiment showing scale or integration (e.g., POS integration test, paid marketing campaigns).",
      "Revenue or partnership test."
    ],
    "milestones": [
      "Day 90 quantitative milestone (e.g., '$500 monthly revenue').",
      "Expansion milestone."
    ],
    "confidence": "Current rating ('High' or 'Medium' or 'Low')"
  }
}
`;
  return callGemini(apiKey, promptText, true);
}

// Stage 5: Gate Candidates Generator
// (Creates 2 candidate experiments for the user to choose or edit in the Gate screen)
export async function runGateCandidatesStage(apiKey, intakeData, plan30, risks, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage5 : mockIdeas[0].stage5;
  }

  const promptText = `
You are a lean product manager. Based on this startup idea and its 30-day plan, formulate exactly 2 candidate "First Experiments" for the human user to choose from.
Idea Value Prop: "${intakeData.valueProposition}"
30-Day Experiments: ${JSON.stringify(plan30.experiments)}
Risks: ${JSON.stringify(risks)}

Return a JSON array containing exactly 2 experiment objects. Each object must have EXACTLY the following structure:
[
  {
    "id": "exp1",
    "title": "Catchy title of the experiment (e.g., 'Single-Cafe Email Subscription Pilot')",
    "description": "Detailed description of what the user will do, how they will measure success, and why this works (2-3 sentences). Keep it highly manual and cheap.",
    "riskAddressed": "Which risk/assumption category from the risk register this is validating."
  },
  {
    "id": "exp2",
    "title": "Catchy title of second experiment",
    "description": "Detailed description of what the user will do, how they will measure success, and why this works (2-3 sentences). Keep it highly manual and cheap.",
    "riskAddressed": "Which risk/assumption category from the risk register this is validating."
  }
]
`;
  return callGemini(apiKey, promptText, true);
}

// Stage 6: Resource Mapping (LLM Decision)
// Evaluates which RESOURCE CATEGORIES match the idea's type, subdomain, chosen experiment, and remaining risks.
// Return categories must match the exact strings in the static database:
// - "pre-validation micro-grants"
// - "creator economy funds"
// - "no-code/low-code prototyping grants"
// - "accelerator programs"
// - "general-purpose founder communities"
// - "subject-matter mentors"
export async function runResourceMappingStage(apiKey, ideaType, subDomain, chosenExperimentText, unresolvedRisks, isDemoMode = false, demoId = null) {
  if (isDemoMode && demoId) {
    const demo = mockIdeas.find(d => d.id === demoId);
    return demo ? demo.stage6 : mockIdeas[0].stage6;
  }

  const promptText = `
You are a strategic startup funding advisor.
Evaluate what categories of funding, support, and community networks are appropriate for this startup at its EXACT CURRENT STAGE.
The user has picked a First Experiment and has unresolved risks.

Venture Profile:
- Idea Type: "${ideaType}"
- Subdomain: "${subDomain}"
- Chosen First Experiment: "${chosenExperimentText}"
- Unresolved Risks: ${JSON.stringify(unresolvedRisks)}

Determine which of the following resource categories are relevant NOW, LATER, or NOT YET.
Allowed Categories for 'funding_categories' and 'network_categories':
- "pre-validation micro-grants"
- "creator economy funds"
- "no-code/low-code prototyping grants"
- "accelerator programs"
- "general-purpose founder communities"
- "subject-matter mentors"

Rules for reasoning:
1. If the idea is pre-validation (unresolved high risks, manual experiment), they should NOT seek "accelerator programs" or venture capital now. Urgency for accelerators should be "later".
2. If it's a content creator idea, they need "creator economy funds" rather than standard tech grants.
3. If it's a software/product idea in early testing, they need "no-code/low-code prototyping grants" now.
4. "general-purpose founder communities" and "subject-matter mentors" are almost always needed now.
5. In 'explicitly_not_yet', list 2-3 types of capital or structures they should NOT pursue right now (e.g. "VC seed rounds", "equity crowdfunding", "bank business loans") with a 1-sentence warning for why it is dangerous or premature.

Return a JSON object with EXACTLY the following structure:
{
  "funding_categories": [
    {
      "category": "Exact string of category from the list above",
      "rationale": "A clear explanation of why this fits their current experiment and risk profile (1-2 sentences).",
      "urgency": "now" or "later"
    }
  ],
  "network_categories": [
    {
      "category": "Exact string of category from the list above",
      "rationale": "Explanation of how this community/mentor tier will help them execute this specific experiment (1-2 sentences)."
    }
  ],
  "explicitly_not_yet": [
    "Name of resource + 1-sentence reason (e.g., 'VC Seed Rounds: You have no validated revenue yet, and pitch meetings will distract from customer conversations.')",
    "Another premature resource and rationale"
  ]
}
`;
  return callGemini(apiKey, promptText, true);
}

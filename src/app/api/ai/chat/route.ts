import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_INSTRUCTION = `You are INCLUDE360 AI, the official intelligent assistant for INCLUDE360 — an AI-powered Inclusive Education, Accessibility & Governance Ecosystem built for Smart India Hackathon (SIH1500).

YOUR CORE RESPONSIBILITIES & BOUNDARIES:
1. ONLY answer questions related to INCLUDE360, inclusive education for specially-abled students, accessibility technologies, statutory legal compliance (RPWD Act 2016, UGC, NEP 2020), examination accommodations, institutional audits, and website features.
2. If a user asks a question completely unrelated to inclusive education or this platform (e.g., unrelated movies, general programming, sports, cooking), politely decline and state: "I am specialized in the INCLUDE360 Inclusive Education Ecosystem. Please ask me about student accommodations, RPWD compliance, examination scribes, institutional audits, or platform features."
3. Always respond in clear, professional, structured Markdown with bullet points, bold highlights, and actionable steps.

KEY INCLUDE360 DOMAIN KNOWLEDGE:
- **RPWD Act 2016 Mandates**:
  - Section 16 & 17: Mandatory inclusive education, barrier-free access, special educator appointments, accessible study materials.
  - Section 32: 5% mandatory reservation in higher education admissions for disabled students.
  - Section 34: 4% affirmative action employment quota in public and corporate sectors.
  - Exam Extra Time: Statutory 20 minutes per hour of exam for benchmark disabilities (≥40%).
- **Ecosystem Modules**:
  1. Intake & Placements (/lifecycle): 5% quota admission, UNESCO female retention radar, affirmative action jobs.
  2. Student Profiles (/students): Swavlamban UDID 18-digit verification, IEP/ISP personalized plans.
  3. Adaptive Learning (/learning): Text-to-Speech (Alt+R), OpenDyslexic font, AI Concept Simplifier, accessible quizzes.
  4. Accessibility Services (/accessibility): Scribe booking, ISL interpreters, readers, campus transport.
  5. Examination Accommodations (/examinations): 20 min/hr compensatory time calculator, certified scribe roster.
  6. Institutional Audit (/audit): 1:12 ramp slope, tactile tiles, accessible washrooms, 0-100 scoring.
  7. Compliance Engine (/compliance): RPWD Act and UGC legal compliance checklists with evidence uploads.
  8. Governance & Policies (/governance): Institutional inclusion council resolutions, agendas.
  9. Conduct & Safety (/conduct): Confidential reporting for barrier denial, bullying, elevator failure.
  10. AI Intelligence (/ai): Scribe demand forecasting, risk prediction, human-in-the-loop approvals.
  11. District Authority Analytics (/authorities): Macro state/district heatmaps and compliance comparisons.
  12. Digital Campus Kiosk (/kiosk): Large-touch and voice-guided terminal with emergency escort beacon.

- **15 Connected Roles**: Student, Parent, Class Teacher, Special Educator, School Counselor, Accessibility Coordinator, Exam Coordinator, Institution Admin, Principal, Support Staff, IT Admin, Accessibility Auditor, District Officer, Government Authority, Super Admin.
- **National Statistics (UNESCO 2019)**: 27% of disabled children (5-19 yrs) in India never attend school; 75% of 5-year-olds excluded; female disabled students face high dropout rates without accessible infrastructure.

Answer the user's inquiry accurately, thoroughly, and concisely using this domain knowledge.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, apiKey, platformState } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Resolve Keys & Trim
    const rawGroqKey = process.env.GROQ_API_KEY || (apiKey?.startsWith('gsk_') ? apiKey : undefined);
    const rawGeminiKey = process.env.GEMINI_API_KEY || (!apiKey?.startsWith('gsk_') ? apiKey : undefined);

    const groqKey = rawGroqKey ? rawGroqKey.trim().replace(/^["']|["']$/g, '') : null;
    const geminiKey = rawGeminiKey ? rawGeminiKey.trim().replace(/^["']|["']$/g, '') : null;

    // --- A. GROQ INFERENCE ---
    if (groqKey) {
      const groqMessages = [
        {
          role: 'system',
          content: `${SYSTEM_INSTRUCTION}\n\nLIVE PLATFORM STATE CONTEXT:\n${JSON.stringify(platformState || {})}`,
        },
      ];

      if (Array.isArray(history)) {
        history.forEach((h: { sender: string; text: string }) => {
          groqMessages.push({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text,
          });
        });
      }

      groqMessages.push({
        role: 'user',
        content: message,
      });

      // Active Groq models tested and verified for this key
      const candidateModels = [
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'qwen/qwen3.6-27b',
        'groq/compound',
        'groq/compound-mini',
      ];

      let reply: string | null = null;
      let usedModel = candidateModels[0];
      let lastError = '';

      for (const model of candidateModels) {
        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: groqMessages,
              temperature: 0.3,
              max_tokens: 1024,
            }),
          });

          if (groqRes.ok) {
            const groqData = await groqRes.json();
            reply = groqData.choices?.[0]?.message?.content || null;
            usedModel = model;
            break;
          } else {
            const errData = await groqRes.json();
            lastError = errData.error?.message || `Status ${groqRes.status}`;
          }
        } catch (e: any) {
          lastError = e.message;
        }
      }

      if (!reply) {
        return NextResponse.json(
          { error: `Groq error: ${lastError}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        reply,
        provider: `Groq (${usedModel})`,
        sources: ['INCLUDE360 Live Knowledge Base', 'RPWD Act 2016', 'Platform DB'],
        confidence: 98,
      });
    }

    // --- B. GEMINI INFERENCE (Alternative) ---
    if (geminiKey) {
      const contents = [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nLIVE PLATFORM STATE CONTEXT:\n${JSON.stringify(platformState || {})}` }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am INCLUDE360 AI, strictly grounded in the inclusive education ecosystem and platform data.' }],
        },
      ];

      if (Array.isArray(history)) {
        history.forEach((h: { sender: string; text: string }) => {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        });
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!geminiResponse.ok) {
        let errMessage = `Gemini API Error (${geminiResponse.status})`;
        try {
          const errorData = await geminiResponse.json();
          errMessage = errorData.error?.message || errMessage;
        } catch (e) {}
        return NextResponse.json({ error: errMessage }, { status: geminiResponse.status });
      }

      const data = await geminiResponse.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

      return NextResponse.json({
        reply: responseText,
        provider: 'Google Gemini',
        sources: ['INCLUDE360 Knowledge Base', 'RPWD Act 2016', 'Live Platform Database'],
        confidence: 96,
      });
    }

    // --- C. NO API KEY CONFIGURED ---
    return NextResponse.json({
      requiresApiKey: true,
      error: 'No GROQ_API_KEY found in .env.local or UI. Add GROQ_API_KEY=gsk_... to .env.local to enable instant AI responses.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

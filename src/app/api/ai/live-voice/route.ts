import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SAKSHAM_SYSTEM_PROMPT = `You are Saksham AI, the official intelligent voice & multimodal assistant for Saksham — an inclusive education, accessibility & governance ecosystem designed for Jharkhand, India.

CRITICAL VOICE INSTRUCTIONS:
1. MULTILINGUAL ACCURACY & NATURAL SPEECH:
   - Detect the language of the user's speech/message (Marathi, Hindi, or English).
   - If user speaks in Marathi (e.g., "मला शिष्यवृत्ती कुठे मिळेल?", "मला Jobs दाखव"), respond in fluent, natural Marathi in Devanagari script.
   - If user speaks in Hindi (e.g., "मुझे परीक्षा के लिए लेखक चाहिए", "छात्रवृत्ति कैसे मिलेगी?"), respond in natural Hindi in Devanagari script.
   - If user speaks in English, respond in clear English.
   - NEVER transliterate Marathi or Hindi into Roman/Latin script (no "Mala scholarship", use "मला शिष्यवृत्ती").
   - Speak naturally. DO NOT include raw emojis, asterisks, bullet marks, or markdown tables in spoken responses.

2. CONTEXT-AWARENESS & LIVE PAGE GROUNDING:
   - You receive the user's CURRENT ROUTE, PAGE TITLE, and USER ROLE.
   - If user says "Explain this page" / "हे मला समजत नाही" / "यह क्या है?", explain the current page clearly and simply.
   - Routes:
     * /dashboard: Main Overview Hub with role-tailored KPIs, accommodations, and quick access.
     * /learning: Adaptive Learning & AI-powered PDF study companion (concept simplification, text-to-speech audio lessons, quizzes).
     * /opportunities: Jobs & Internships for Persons with Disabilities (PwD) with 4% statutory affirmative action vacancies.
     * /lifecycle: Student Intake & Career Placement with UDID verification and UNESCO retention tracking.
     * /students: Learner Profiles & IEP Documentation (Students see their own profile; Staff/Gov see student directory).
     * /accessibility: Assistive Services, Assistive Device distribution (Screen Readers, Wheelchairs, Hearing Aids), Interpreter booking.
     * /examinations: Exam Accommodations, Certified Scribe Roster, 20 min/hour compensatory time calculator.
     * /audit: Institutional Accessibility Audit for Jharkhand schools and colleges (1:12 ramp slope, tactile paving, accessible toilets).
     * /compliance: Statutory RPWD Act 2016 (Sections 16 & 17) & UGC Inclusive Education Compliance Engine.
     * /governance: Policy, Legal Mandates, Disability Scholarships (National Pre/Post-Matric, Higher Education fellowship).
     * /conduct: Safety, Anti-Discrimination, Barrier Denial reporting, and Grievance redressal.
     * /authorities: Government Authority & District Analytics (District accessibility heatmap, aggregated scores).
     * /professional/requests: Support Professional available requests list.
     * /professional/assignments: Support Professional confirmed assignments.

3. ROLE-BASED ACCESS CONTROL & PERMISSIONS:
   - STUDENT:
     * Allowed: /dashboard, /students (My Profile), /learning, /opportunities, /lifecycle, /accessibility, /examinations, /governance, /conduct.
     * BLOCKED: /compliance, /audit, and other students' private records.
     * If a student asks to open restricted pages:
       Explain politely: "हा विभाग केवळ संस्था कर्मचारी आणि शासकीय अधिकाऱ्यांसाठी राखीव आहे." (Marathi) / "यह अनुभाग केवल अधिकृत अधिकारियों के लिए है।" (Hindi) / "This section is restricted to authorized staff and authorities." (English).
   - ACCESSIBILITY PROFESSIONAL:
     * Allowed: /dashboard, /professional/requests, /professional/assignments, /professional/schedule, /professional/profile, /learning, /governance, /conduct.
     * BLOCKED: /students directory, /audit, /compliance.
   - STAFF:
     * Allowed: All institutional modules, student support directory, professional verification, exam scribe roster, campus audit checklist, compliance engine.
   - GOVERNMENT:
     * Allowed: State/District oversight, professional license oversight, authority analytics, remediation notice dispatch, compliance verification.

4. AGENTIC NAVIGATION ACTIONS:
   - When the user asks to navigate to a page or view a section, append the appropriate ACTION tag at the very end of your response:
     [ACTION: GO_TO_DASHBOARD]
     [ACTION: GO_TO_PROFILE]
     [ACTION: GO_TO_JOBS]
     [ACTION: GO_TO_INTAKE]
     [ACTION: GO_TO_LEARNING]
     [ACTION: GO_TO_ACCESSIBILITY]
     [ACTION: GO_TO_EXAM_ACCOMMODATIONS]
     [ACTION: GO_TO_PROF_REQUESTS]
     [ACTION: GO_TO_PROF_ASSIGNMENTS]
     [ACTION: GO_TO_AUDIT]
     [ACTION: GO_TO_COMPLIANCE]
     [ACTION: GO_TO_GOVERNANCE]
     [ACTION: GO_TO_CONDUCT]
     [ACTION: GO_TO_AUTHORITY_ANALYTICS]
   - NEVER add an action tag if the user's role is not authorized to access that route!

5. Keep responses concise (2 to 4 sentences), supportive, and spoken naturally.`;

function parseAction(reply: string, role: string) {
  let cleanReply = reply.trim();
  let suggestedAction: { label: string; href: string } | undefined = undefined;

  const actionMatch = cleanReply.match(/\[ACTION:\s*([A-Z_]+)\]/i);
  if (actionMatch) {
    const actionType = actionMatch[1].toUpperCase();
    cleanReply = cleanReply.replace(/\[ACTION:\s*[A-Z_]+\]/gi, '').trim();

    const isGov = ['government', 'government_authority', 'district_officer', 'super_admin'].includes(role);
    const isStaff = ['institution_staff', 'institution_admin', 'special_educator', 'accessibility_coordinator', 'examination_coordinator', 'principal', 'support_staff', 'it_admin', 'counselor', 'auditor', 'teacher'].includes(role);
    const isProf = ['accessibility_professional', 'professional'].includes(role);

    switch (actionType) {
      case 'GO_TO_DASHBOARD':
        suggestedAction = { label: 'Go to Dashboard', href: '/dashboard' };
        break;
      case 'GO_TO_PROFILE':
        suggestedAction = { label: 'Open Profile', href: '/students' };
        break;
      case 'GO_TO_JOBS':
        suggestedAction = { label: 'Explore Jobs & Internships', href: '/opportunities' };
        break;
      case 'GO_TO_INTAKE':
        suggestedAction = { label: 'View Admissions & Intake', href: '/lifecycle' };
        break;
      case 'GO_TO_LEARNING':
        suggestedAction = { label: 'Open Adaptive Learning', href: '/learning' };
        break;
      case 'GO_TO_ACCESSIBILITY':
        suggestedAction = { label: 'Request Accessibility Support', href: '/accessibility' };
        break;
      case 'GO_TO_EXAM_ACCOMMODATIONS':
        suggestedAction = { label: 'View Exam Accommodations', href: '/examinations' };
        break;
      case 'GO_TO_PROF_REQUESTS':
        if (isProf || isStaff || isGov) {
          suggestedAction = { label: 'Open Support Requests', href: '/professional/requests' };
        }
        break;
      case 'GO_TO_PROF_ASSIGNMENTS':
        if (isProf || isStaff || isGov) {
          suggestedAction = { label: 'View Duty Assignments', href: '/professional/assignments' };
        }
        break;
      case 'GO_TO_AUDIT':
        if (isStaff || isGov) {
          suggestedAction = { label: 'Open Accessibility Audit', href: '/audit' };
        }
        break;
      case 'GO_TO_COMPLIANCE':
        if (isStaff || isGov) {
          suggestedAction = { label: 'Open Compliance Engine', href: '/compliance' };
        }
        break;
      case 'GO_TO_GOVERNANCE':
        suggestedAction = { label: 'View Schemes & Policies', href: '/governance' };
        break;
      case 'GO_TO_CONDUCT':
        suggestedAction = { label: 'Report Grievance / Issue', href: '/conduct' };
        break;
      case 'GO_TO_AUTHORITY_ANALYTICS':
        if (isGov) {
          suggestedAction = { label: 'Open Authority Analytics', href: '/authorities' };
        }
        break;
    }
  }

  return { cleanReply, suggestedAction };
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_NOT_CONFIGURED', message: 'Gemini API key is not configured.' },
        { status: 500 }
      );
    }

    const {
      message,
      audioBase64,
      audioMimeType = 'audio/webm',
      history = [],
      currentPage = '/dashboard',
      pageTitle = 'Dashboard',
      currentRole = 'student',
      language = 'hi',
      pageContext = '',
    } = await req.json();

    const systemPromptWithContext = `${SAKSHAM_SYSTEM_PROMPT}

SESSION CONTEXT:
- Active Route: ${currentPage}
- Page Title: ${pageTitle}
- User Role: ${currentRole}
- Active UI Language: ${language}
- Visible Page Text Snippet: ${(pageContext || '').slice(0, 400)}
`;

    // Construct Gemini Content Parts
    const contents: any[] = [];

    // Add recent conversation history
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-4).forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      });
    }

    const userParts: any[] = [];

    // If audio is provided, attach inline audio
    if (audioBase64) {
      userParts.push({
        inlineData: {
          mimeType: audioMimeType,
          data: audioBase64,
        },
      });
      userParts.push({
        text: `The user spoke the above audio. First transcribe what the user said in the EXACT spoken language (in Devanagari for Marathi/Hindi, Latin for English). Then answer as Saksham AI with live page grounding.
Format your output exactly as:
TRANSCRIPT: <transcription of user speech>
RESPONSE: <your response to the user>`,
      });
    } else if (message) {
      userParts.push({
        text: message,
      });
    } else {
      return NextResponse.json({ error: 'NO_INPUT', message: 'No message or audio provided.' }, { status: 400 });
    }

    contents.push({
      role: 'user',
      parts: userParts,
    });

    // 1. Generate Intelligent Answer via Gemini 3.6 Flash
    const genRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPromptWithContext }],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!genRes.ok) {
      const errData = await genRes.json().catch(() => ({}));
      console.error('Gemini Generate Content Error:', errData);
      return NextResponse.json(
        { error: 'GEMINI_ERROR', message: 'Gemini processing failed', details: errData },
        { status: genRes.status }
      );
    }

    const genData = await genRes.json();
    const rawOutput = genData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let userTranscript = message || '';
    let aiResponseText = rawOutput;

    // Parse transcript if audio was sent
    if (audioBase64 && rawOutput.includes('TRANSCRIPT:') && rawOutput.includes('RESPONSE:')) {
      const transcriptMatch = rawOutput.match(/TRANSCRIPT:\s*([\s\S]*?)(?=RESPONSE:|$)/i);
      const responseMatch = rawOutput.match(/RESPONSE:\s*([\s\S]*$)/i);
      if (transcriptMatch) userTranscript = transcriptMatch[1].trim();
      if (responseMatch) aiResponseText = responseMatch[1].trim();
    }

    const { cleanReply, suggestedAction } = parseAction(aiResponseText, currentRole);

    // Clean text for speech synthesizer (remove markdown asterisks, hashes, brackets)
    const cleanSpeechText = cleanReply
      .replace(/[*_#`]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // 2. Synthesize Native High-Fidelity Audio via Gemini TTS
    let audioOutputBase64 = null;
    let audioOutputMimeType = null;

    try {
      const ttsRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: cleanSpeechText.slice(0, 500) }] }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: 'Aoede',
                  },
                },
              },
            },
          }),
        }
      );

      if (ttsRes.ok) {
        const ttsData = await ttsRes.json();
        const audioPart = ttsData.candidates?.[0]?.content?.parts?.[0]?.inlineData;
        if (audioPart?.data) {
          audioOutputBase64 = audioPart.data;
          audioOutputMimeType = audioPart.mimeType || 'audio/l16; rate=24000; channels=1';
        }
      }
    } catch (ttsErr) {
      console.error('Gemini Native TTS synthesis error:', ttsErr);
    }

    return NextResponse.json({
      userTranscript,
      reply: cleanReply,
      speechText: cleanSpeechText,
      suggestedAction,
      audioBase64: audioOutputBase64,
      audioMimeType: audioOutputMimeType,
      provider: 'Gemini Live Voice',
      confidence: 99,
    });
  } catch (error: any) {
    console.error('Gemini Live Voice Route Error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory sliding-window IP rate limiter
const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // Max 20 requests/min per IP

function isRateLimited(ip: string): boolean {
   if (!ip) return false;
   const now = Date.now();
   const record = ipRequests.get(ip);

   if (!record) {
      ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return false;
   }

   if (now > record.resetAt) {
      ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
      return false;
   }

   if (record.count >= MAX_REQUESTS_PER_WINDOW) {
      return true;
   }

   record.count += 1;
   return false;
}

const SYSTEM_INSTRUCTION = `
You are the interactive AI Portfolio Assistant for Jasim Ihsan M.
Your role is to represent Jasim to recruiters, engineering managers, clients, and visitors by answering inquiries accurately, concisely, and professionally.

=== KEY PROFILE FACTS ===
- Full Name: Jasim Ihsan M
- Role: Software Engineer / Founding Engineer & Full-Stack Developer
- Location: Kerala, India (Open to Remote, Hybrid, and On-site opportunities worldwide)
- Professional Experience: 2+ years of software engineering experience building production-grade web and mobile applications.
- Core Stack & Technologies:
  * Frontend: React.js, Next.js, TypeScript, Flutter (Dart), Tailwind CSS, Redux Toolkit, Framer Motion
  * Backend: Node.js, Express.js, WebSockets (Socket.io), WebRTC, REST APIs
  * Databases & Storage: MongoDB, PostgreSQL, Redis
  * DevOps & Architecture: Docker, BullMQ, Git/GitHub, Clean Architecture
- Key Shipped Projects:
  1. Life Partner Again: High-security Flutter matrimony mobile platform with privacy architecture, real-time messaging, and custom matchmaking algorithms.
  2. Onboard Careers: Comprehensive Maritime & Cruise recruitment portal featuring role-based candidate management pipelines and automated screening.
  3. Forge UI / NearHirable Engine: Diagnostic assessment engine that evaluates developer fundamentals and programming competency.
  4. BrewCode: Interactive algorithm visualizer and developer education sandbox using Docker container sandboxes, Redis, and BullMQ for secure code execution.
  5. MentorsHub: Real-time 1-on-1 video mentoring and peer learning platform powered by Socket.io and WebRTC.
  6. Byteverse: Modern e-commerce web platform integrated with RazorPay checkout, order processing, and inventory management.
- Contact Details & Links:
  * Email: jasimihsan1234@gmail.com
  * Phone: +91 9656646449
  * GitHub: https://github.com/JasimIhsan
  * LinkedIn: https://linkedin.com/in/jasim-ihsan-m
  * Portfolio Website: https://jasimihsan.in

=== RESPONSE GUIDELINES & BOUNDARIES ===
1. Scope & Accuracy: Always ground your answers strictly on the facts provided above. If asked about Jasim's location, availability, experience, projects, or stack, answer directly with the exact facts.
2. Tone: Professional, confident, articulate, and engineering-focused.
3. Formatting: Use clean markdown with bold highlights and bullet points for readability.
4. Privacy & Boundaries: You represent Jasim strictly in a professional software engineering capacity. If a user asks about private/personal matters (e.g., family, parents, finances, non-work personal life) or unrelated off-topic topics, politely state that you can only answer questions regarding Jasim's engineering experience, skills, and portfolio, and invite them to reach out to Jasim directly via email or LinkedIn.
`;

export async function POST(req: NextRequest) {
   const startTime = performance.now();

   // 1. IP Rate Limiting Check
   const forwarded = req.headers.get("x-forwarded-for");
   const clientIp = forwarded ? forwarded.split(",")[0].trim() : "anonymous";

   if (isRateLimited(clientIp)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment before asking again." }, { status: 429 });
   }

   // 2. Server API Key Check
   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not configured.");
      return NextResponse.json({ error: "AI Assistant is currently unavailable. Please try again later." }, { status: 500 });
   }

   try {
      const body = await req.json();
      const { message, history } = body || {};

      // 3. Input Sanitization & Validation
      if (!message || typeof message !== "string") {
         return NextResponse.json({ error: "Message is required and must be text." }, { status: 400 });
      }

      const trimmedMessage = message.trim();
      if (trimmedMessage.length === 0) {
         return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
      }

      if (trimmedMessage.length > 300) {
         return NextResponse.json({ error: "Message exceeds maximum length of 300 characters." }, { status: 400 });
      }

      const sanitizedHistory = Array.isArray(history)
         ? history
              .filter((item) => item && typeof item.role === "string" && typeof item.content === "string")
              .slice(-6)
              .map((item) => ({
                 role: item.role === "user" ? ("user" as const) : ("model" as const),
                 parts: [{ text: String(item.content).slice(0, 300) }],
              }))
         : [];

      const candidateModels = ["gemini-3.6-flash", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
      const ai = new GoogleGenAI({ apiKey });
      const contents = [
         ...sanitizedHistory,
         {
            role: "user" as const,
            parts: [{ text: trimmedMessage }],
         },
      ];

      let replyText = "";
      let usedModel = "Gemini 3.6 Flash";

      for (const modelName of candidateModels) {
         try {
            const response = await ai.models.generateContent({
               model: modelName,
               contents,
               config: {
                  systemInstruction: SYSTEM_INSTRUCTION,
                  temperature: 0.3,
                  maxOutputTokens: 1000,
               },
            });
            if (response && response.text) {
               replyText = response.text.trim();
               usedModel = modelName === "gemini-3.6-flash" ? "Gemini 3.6 Flash" : "Gemini 3.1 Flash";
               break;
            }
         } catch (err) {
            console.warn(`Attempt with ${modelName} encountered:`, (err as Error).message);
         }
      }

      if (!replyText) {
         replyText = "I'm currently unable to generate a response due to high server demand. Please try again in a moment or contact Jasim directly at jasimihsan1234@gmail.com.";
      }

      const latencyMs = Math.round(performance.now() - startTime);
      console.log(
         JSON.stringify({
            timestamp: new Date().toISOString(),
            route: "/api/chat",
            model: usedModel,
            query: trimmedMessage,
            latencyMs,
            ip: clientIp,
         })
      );

      return NextResponse.json(
         { reply: replyText, model: usedModel },
         {
            status: 200,
            headers: {
               "X-Response-Time": `${latencyMs}ms`,
            },
         }
      );
   } catch (error) {
      console.error("Next.js App Router AI Chat Exception:", error);
      return NextResponse.json({ error: "Failed to generate response. Please try again or reach out directly." }, { status: 500 });
   }
}

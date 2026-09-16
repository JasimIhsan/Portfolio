import { GoogleGenAI } from "@google/genai";
import { Index } from "@upstash/vector";

const CANONICAL_FAQS = [
   {
      question: "What is Jasim's primary tech stack?",
      variations: ["What technologies does Jasim use?", "What is Jasim's tech stack?", "Which programming languages and frameworks does he know?"],
      answer: `Jasim's primary tech stack spans modern web and mobile engineering:

* **Frontend:** React.js, Next.js, TypeScript, Flutter (Dart), Tailwind CSS, Redux
* **Backend:** Node.js, Express.js, WebSockets (Socket.io), WebRTC
* **Databases & Caching:** MongoDB, PostgreSQL, Redis
* **DevOps & Tools:** Docker, BullMQ, Git/GitHub, Upstash

He specializes in building high-performance, full-stack applications and cross-platform mobile solutions.`,
   },
   {
      question: "Tell me about his key projects",
      variations: ["What are Jasim's featured projects?", "What has Jasim built?", "List his main software engineering projects", "What projects has he worked on?"],
      answer: `Here are Jasim's key featured engineering projects:

1. **Life Partner Again:** Flutter matrimony platform featuring privacy-first architecture, real-time messaging, and custom matchmaking algorithms.
2. **Onboard Careers:** Maritime & Cruise recruitment portal with role-based application pipelines and automated candidate filtering.
3. **Forge UI / NearHirable Engine:** Automated diagnostic assessment engine designed to analyze and evaluate developer fundamentals.
4. **BrewCode:** Interactive algorithm visualizer and developer education sandbox powered by Docker, Redis, and BullMQ for safe code execution.
5. **MentorsHub:** Real-time 1-on-1 video and mentorship platform built with Socket.io and WebRTC.
6. **Byteverse:** Full-stack e-commerce platform integrated with RazorPay checkout and inventory management.`,
   },
   {
      question: "Is Jasim available for full-time roles?",
      variations: ["Is Jasim open to work?", "Can I hire Jasim?", "Is Jasim looking for a job?", "What is Jasim's availability?"],
      answer: `Yes! Jasim is actively open to full-time Software Engineer and Founding Engineer opportunities.

* **Preferred Roles:** Full-Stack Engineer, Frontend Engineer (React/Next.js), Mobile Engineer (Flutter)
* **Location:** Open to remote, hybrid, or on-site roles.
* **Get in touch:** You can reach out directly via email at [jasimihsan1234@gmail.com](mailto:jasimihsan1234@gmail.com) or connect on [LinkedIn](https://linkedin.com/in/jasim-ihsan-m).`,
   },
   {
      question: "What is his experience with Flutter and mobile development?",
      variations: ["Does Jasim know Flutter?", "What mobile apps has Jasim built?", "Tell me about his Flutter experience"],
      answer: `Jasim has extensive production experience building cross-platform mobile applications with **Flutter and Dart**:

* Built and deployed **Life Partner Again**, a privacy-focused matrimony mobile app with real-time chat, push notifications, and custom matchmaking workflows.
* Proficient in clean architecture, state management (Bloc, Provider, GetX), native platform channels, and RESTful/WebSocket integrations.`,
   },
   {
      question: "How can I contact Jasim?",
      variations: ["What is Jasim's email?", "How to reach Jasim?", "What are his contact details and social links?"],
      answer: `You can contact Jasim directly through the following channels:

* **Email:** [jasimihsan1234@gmail.com](mailto:jasimihsan1234@gmail.com)
* **Phone:** +91 9656646449
* **GitHub:** [github.com/JasimIhsan](https://github.com/JasimIhsan)
* **LinkedIn:** [linkedin.com/in/jasim-ihsan-m](https://linkedin.com/in/jasim-ihsan-m)
* Or submit an inquiry through the portfolio contact section!`,
   },
];

async function seed() {
   const geminiApiKey = process.env.GEMINI_API_KEY;
   const vectorUrl = process.env.UPSTASH_VECTOR_REST_URL;
   const vectorToken = process.env.UPSTASH_VECTOR_REST_TOKEN;

   if (!geminiApiKey) {
      console.error("❌ Error: GEMINI_API_KEY is missing in environment.");
      process.exit(1);
   }

   if (!vectorUrl || !vectorToken) {
      console.error("❌ Error: UPSTASH_VECTOR_REST_URL or UPSTASH_VECTOR_REST_TOKEN is missing in environment.");
      console.error("Please add your Upstash Vector credentials to .env first.");
      process.exit(1);
   }

   console.log("🚀 Initializing Upstash Vector Index & Gemini Embeddings...");
   const index = new Index({ url: vectorUrl, token: vectorToken });
   const ai = new GoogleGenAI({ apiKey: geminiApiKey });

   let totalUpserted = 0;

   for (const faq of CANONICAL_FAQS) {
      const allQueries = [faq.question, ...faq.variations];

      for (const query of allQueries) {
         try {
            process.stdout.write(`Embedding: "${query}"... `);
            const embedRes = await ai.models.embedContent({
               model: "gemini-embedding-001",
               contents: query,
               config: {
                  outputDimensionality: 768,
               },
            });

            const vector = embedRes.embeddings?.[0]?.values;
            if (!vector) {
               console.log("⚠️ No vector returned, skipping.");
               continue;
            }

            const recordId = `faq-${Buffer.from(query.toLowerCase().replace(/[^\w]/g, "")).toString("base64url").slice(0, 60)}`;

            await index.upsert([
               {
                  id: recordId,
                  vector,
                  metadata: {
                     question: faq.question,
                     answer: faq.answer,
                     timestamp: Date.now(),
                  },
               },
            ]);

            console.log("✅ Upserted!");
            totalUpserted++;
         } catch (err) {
            console.error(`❌ Failed on "${query}":`, (err as Error).message);
         }
      }
   }

   console.log(`\n🎉 Pre-warming complete! Successfully seeded ${totalUpserted} FAQ vector embeddings to Upstash.`);
}

seed();

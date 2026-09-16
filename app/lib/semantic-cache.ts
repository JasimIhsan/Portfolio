import { GoogleGenAI } from "@google/genai";
import { Index } from "@upstash/vector";

export interface CacheMetadata {
   question: string;
   answer: string;
   timestamp: number;
   [key: string]: unknown;
}

export interface SemanticCacheResult {
   hit: boolean;
   answer?: string;
   matchedQuestion?: string;
   similarityScore?: number;
}

export function normalizeQuery(query: string): string {
   return query
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // remove punctuation
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim();
}

// -------------------------------------------------------------
// Tier 2: Upstash Vector Index Client Setup
// -------------------------------------------------------------
let vectorIndex: Index<CacheMetadata> | null = null;

export function getUpstashVectorIndex(): Index<CacheMetadata> | null {
   if (vectorIndex) return vectorIndex;

   const url = process.env.UPSTASH_VECTOR_REST_URL;
   const token = process.env.UPSTASH_VECTOR_REST_TOKEN;

   if (!url || !token) {
      return null;
   }

   try {
      vectorIndex = new Index<CacheMetadata>({
         url,
         token,
      });
      return vectorIndex;
   } catch (error) {
      console.warn("Failed to initialize Upstash Vector index:", error);
      return null;
   }
}

// -------------------------------------------------------------
// Gemini Embedding Generation (gemini-embedding-001)
// -------------------------------------------------------------
export async function generateEmbedding(text: string, apiKey: string): Promise<number[] | null> {
   if (!text || !apiKey) return null;

   try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.embedContent({
         model: "gemini-embedding-001",
         contents: text,
         config: {
            outputDimensionality: 768,
         },
      });

      const embeddingValues = response?.embeddings?.[0]?.values;
      if (Array.isArray(embeddingValues) && embeddingValues.length > 0) {
         return embeddingValues;
      }
      return null;
   } catch (error) {
      console.warn("Gemini embedding generation failed:", error);
      return null;
   }
}

// -------------------------------------------------------------
// Upstash Vector Semantic Similarity Query
// -------------------------------------------------------------
export async function querySemanticCache(vector: number[], threshold = 0.85): Promise<SemanticCacheResult> {
   const index = getUpstashVectorIndex();
   if (!index) {
      return { hit: false };
   }

   try {
      const results = await index.query({
         vector,
         topK: 1,
         includeMetadata: true,
      });

      if (!results || results.length === 0) {
         return { hit: false };
      }

      const bestMatch = results[0];
      const score = bestMatch.score;
      const metadata = bestMatch.metadata;

      if (score >= threshold && metadata?.answer) {
         return {
            hit: true,
            answer: metadata.answer,
            matchedQuestion: metadata.question,
            similarityScore: score,
         };
      }

      return {
         hit: false,
         similarityScore: score,
      };
   } catch (error) {
      console.warn("Upstash Vector query failed:", error);
      return { hit: false };
   }
}

// -------------------------------------------------------------
// Upstash Vector Upsert
// -------------------------------------------------------------
export async function upsertSemanticCache(question: string, vector: number[], answer: string): Promise<void> {
   const normalized = normalizeQuery(question);
   const index = getUpstashVectorIndex();
   if (!index) return;

   try {
      // Deterministic or unique ID
      const recordId = `faq-${Buffer.from(normalized).toString("base64url").slice(0, 64)}-${Date.now()}`;

      await index.upsert([
         {
            id: recordId,
            vector,
            metadata: {
               question,
               answer,
               timestamp: Date.now(),
            },
         },
      ]);
   } catch (error) {
      console.warn("Upstash Vector upsert failed:", error);
   }
}

import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "optiviz", // Unique app ID
  name: "Optiviz",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
import * as z from "zod";

import { parseEnv } from "./parse";

const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_APP_URL: z.url(),
});

export const clientEnv = parseEnv(
  clientSchema,
  {
    // Each key must be written out literally so Next.js can inline it
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  "client"
);

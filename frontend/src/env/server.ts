import "server-only";
import * as z from "zod";

import { parseEnv } from "./parse";

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  GATEWAY_URL: z.url(),
  AUTH_SECRET: z.string().min(32, "must be at least 32 characters"),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal"])
    .optional(),
});

export const serverEnv = parseEnv(serverSchema, process.env, "server");

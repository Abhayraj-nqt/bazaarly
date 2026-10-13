import "server-only";
import pino from "pino";

const isProd = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isProd ? "info" : "debug"),
  redact: [
    "*.password",
    "*.token",
    "*.accessToken",
    "*.refreshToken",
    "req.headers.authorization",
  ],
  ...(!isProd && { transport: { target: "pino-pretty" } }),
});

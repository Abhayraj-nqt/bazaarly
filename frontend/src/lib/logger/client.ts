import "client-only";
type Level = "debug" | "info" | "warn" | "error";
const isProd = process.env.NODE_ENV === "production";

function log(level: Level, message: string, context?: Record<string, unknown>) {
  if (isProd && (level === "debug" || level === "info")) return;
  console[level](`[${level}] ${message}`, context ?? "");
}

export const clientLogger = {
  debug: (m: string, c?: Record<string, unknown>) => log("debug", m, c),
  info: (m: string, c?: Record<string, unknown>) => log("info", m, c),
  warn: (m: string, c?: Record<string, unknown>) => log("warn", m, c),
  error: (m: string, c?: Record<string, unknown>) => log("error", m, c),
};

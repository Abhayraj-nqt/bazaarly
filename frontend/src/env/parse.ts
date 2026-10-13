import type { z } from "zod";

export function parseEnv<T extends z.ZodType>(
  schema: T,
  values: unknown,
  label: string
): z.infer<T> {
  const result = schema.safeParse(values);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid ${label} environment variables:\n${details}`);
  }
  return result.data;
}

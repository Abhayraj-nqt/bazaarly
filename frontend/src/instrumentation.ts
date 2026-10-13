export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/env/server");
    await import("@/env/client");
  }
}

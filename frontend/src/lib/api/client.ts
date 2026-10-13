import { ApiError } from "./api-error";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, init);
  const requestId = res.headers.get("x-request-id") ?? undefined;

  if (!res.ok) {
    const body = await res.json().catch(() => undefined);
    throw new ApiError(
      res.status,
      body?.message ?? res.statusText,
      requestId,
      body
    );
  }
  return (await res.json()) as T;
}

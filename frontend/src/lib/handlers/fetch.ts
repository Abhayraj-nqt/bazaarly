import logger from "../logger";
import handleError from "./error";
import { RequestError } from "../http-errors";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 10000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.warn(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}

// ─── HTTP method helpers ───────────────────────────────────────────────────────

export async function _get<T>(
  url: string,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<ActionResponse<T>> {
  return fetchHandler<T>(url, { ...options, method: "GET" });
}

export async function _post<
  T,
  P extends object | unknown[] = Record<string, unknown>,
>(
  url: string,
  payload: P = {} as P,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<ActionResponse<T>> {
  return fetchHandler<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function _put<T, P extends object = Record<string, unknown>>(
  url: string,
  payload: P = {} as P,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<ActionResponse<T>> {
  return fetchHandler<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function _delete<T, P extends object = Record<string, unknown>>(
  url: string,
  payload: P = {} as P,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<ActionResponse<T>> {
  return fetchHandler<T>(url, {
    ...options,
    method: "DELETE",
    body: JSON.stringify(payload),
  });
}

export async function _patch<T, P extends object = Record<string, unknown>>(
  url: string,
  payload: P = {} as P,
  options: Omit<FetchOptions, "method" | "body"> = {}
): Promise<ActionResponse<T>> {
  return fetchHandler<T>(url, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

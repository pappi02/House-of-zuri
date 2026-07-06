import { env } from "./env";

export type ApiErrorShape = {
  message?: string;
  code?: string;
  details?: unknown;
};

export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public details?: unknown;

  constructor(message: string, init?: { status?: number; code?: string; details?: unknown }) {
    super(message);
    this.name = "ApiError";
    this.status = init?.status;
    this.code = init?.code;
    this.details = init?.details;
  }
}

export type HttpRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export async function http<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
  const url = `${env.apiBaseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
  });

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json") ?? false;

  const parsed = isJson ? ((await res.json()) as ApiErrorShape) : ((await res.text()) as unknown as ApiErrorShape);

  if (!res.ok) {
    throw new ApiError(parsed?.message ?? "Request failed", {
      status: res.status,
      code: parsed?.code,
      details: parsed?.details,
    });
  }

  return parsed as T;
}


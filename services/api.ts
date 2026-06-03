const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://nesine-case-study.onrender.com';
const DEFAULT_TIMEOUT_MS = 45_000;
const CACHE_NAME = 'nesine-api-v1';

type Query = Record<string, string | number | boolean | undefined>;

export interface RequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  headers?: Record<string, string>;
  query?: Query;
  persist?: boolean;
}

const hasCacheApi = () => typeof caches !== 'undefined';

function buildUrl(path: string, query?: Query): string {
  const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function writeCache(url: string, body: string): Promise<void> {
  if (!hasCacheApi()) return;
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, new Response(body, { headers: { 'content-type': 'application/json' } }));
  } catch {}
}

export async function readCache<T>(path: string, query?: Query): Promise<T | null> {
  if (!hasCacheApi()) return null;
  try {
    const cache = await caches.open(CACHE_NAME);
    const res = await cache.match(buildUrl(path, query));
    return res ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

async function request<T>(method: string, path: string, body?: unknown, options: RequestOptions = {}): Promise<T> {
  const { signal, timeoutMs = DEFAULT_TIMEOUT_MS, headers, query, persist } = options;
  const url = buildUrl(path, query);

  const timeoutController = new AbortController();
  const timer = setTimeout(() => timeoutController.abort(), timeoutMs);
  const composedSignal =
    signal && typeof AbortSignal.any === 'function'
      ? AbortSignal.any([signal, timeoutController.signal])
      : timeoutController.signal;

  try {
    const res = await fetch(url, {
      method,
      signal: composedSignal,
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(`İstek başarısız (HTTP ${res.status})`);
    }

    const text = await res.text();
    if (persist) void writeCache(url, text);
    return (text ? JSON.parse(text) : null) as T;
  } catch (err) {
    if (timeoutController.signal.aborted && !(signal?.aborted ?? false)) {
      throw new Error('Sunucu yanıt vermedi. Lütfen tekrar deneyin.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>('POST', path, body, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>('PUT', path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) => request<T>('PATCH', path, body, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, undefined, options),
  readCache,
};

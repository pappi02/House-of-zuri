import { Injectable } from '@nestjs/common';
import { HttpClient } from './http-client.interface';

@Injectable()
export class FetchHttpClient implements HttpClient {
  async post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    const response = await this.request(url, { method: 'POST', headers, body: data ? JSON.stringify(data) : undefined });
    return (await response.json()) as T;
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await this.request(url, { method: 'GET', headers });
    return (await response.json()) as T;
  }

  private async request(url: string, init: { method: string; headers?: Record<string, string>; body?: string }): Promise<{ json: () => Promise<unknown> }> {
    const fetchFn = (globalThis as { fetch?: (input: string, init?: unknown) => Promise<{ json: () => Promise<unknown> }> }).fetch;

    if (!fetchFn) {
      throw new Error('Fetch API is not available in this runtime.');
    }

    return await fetchFn(url, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init.headers ?? {}),
      },
    });
  }
}

export interface HttpClient {
  post<T>(url: string, data?: unknown, headers?: Record<string, string>): Promise<T>;
  get<T>(url: string, headers?: Record<string, string>): Promise<T>;
}

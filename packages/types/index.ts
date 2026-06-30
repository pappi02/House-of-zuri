// Shared type definitions
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface HealthStatus {
  status: 'OK' | 'DEGRADED' | 'DOWN';
  timestamp: string;
  version: string;
}

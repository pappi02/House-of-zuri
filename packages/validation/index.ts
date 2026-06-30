import { z } from 'zod';

// Example validation schemas that can be shared between frontend and backend
export const HealthCheckSchema = z.object({
  status: z.enum(['OK', 'DEGRADED', 'DOWN']),
  timestamp: z.string().datetime(),
  version: z.string(),
});

export type HealthCheck = z.infer<typeof HealthCheckSchema>;

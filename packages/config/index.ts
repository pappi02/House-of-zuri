// Shared configuration
export const config = {
  api: {
    port: process.env.API_PORT || 3000,
    url: process.env.API_URL || 'http://localhost:3000',
  },
  web: {
    port: process.env.WEB_PORT || 3001,
    url: process.env.WEB_URL || 'http://localhost:3001',
  },
  database: {
    url: process.env.SUPABASE_URL,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY,
    secretKey: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
    jwksUrl: process.env.SUPABASE_JWKS_URL,
  },
};

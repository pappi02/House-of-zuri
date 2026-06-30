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
    url: process.env.DATABASE_URL,
  },
};

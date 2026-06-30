# House of Zuri

A comprehensive tailoring and fashion management system built with modern technologies.

## Project Structure

```
house-of-zuri/
├── apps/              # Applications
│   ├── api/          # NestJS Backend
│   ├── web/          # Next.js Frontend
│   └── docs/         # Documentation
├── packages/         # Shared packages
│   ├── ui/           # Shared UI Components
│   ├── types/        # Shared TypeScript Types
│   ├── validation/   # Shared Zod Schemas
│   ├── config/       # Shared Configurations
│   ├── utils/        # Shared Utilities
│   ├── constants/    # Shared Constants
│   ├── eslint-config/
│   └── tsconfig/
├── prisma/           # Database
│   ├── schema/       # Prisma schema modules
│   ├── migrations/   # Database migrations
│   ├── seeds/        # Database seeds
│   └── scripts/      # Database scripts
├── infrastructure/   # Infrastructure & DevOps
│   ├── docker/       # Docker configurations
│   ├── github/       # GitHub Actions & configurations
│   ├── monitoring/   # Monitoring setup
│   └── deployment/   # Deployment configurations
└── scripts/          # Root level scripts
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Technologies

- **Backend**: NestJS
- **Frontend**: Next.js & React
- **Database**: PostgreSQL with Prisma ORM
- **Package Manager**: pnpm
- **Monorepo Tool**: Turbo
- **Type Safety**: TypeScript

## Contributing

Please read our contribution guidelines in `docs/CONTRIBUTING.md`

## License

All rights reserved © House of Zuri

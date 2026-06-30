# Architecture Decision Records

This document records the major architectural decisions for House of Zuri.

## ADR-001: Package Manager - pnpm

**Decision**: Use pnpm instead of npm or yarn.

**Reasons**:
- Faster installations
- Better disk space usage with hard-linked store
- Superior monorepo support
- Excellent Turborepo compatibility
- Strict dependency resolution

---

## ADR-002: Monorepo Tool - Turborepo

**Decision**: Use Turborepo instead of Nx.

**Reasons**:
- House of Zuri is a business application, not enterprise
- Simpler configuration than Nx
- Built-in caching and incremental builds
- Excellent Vercel integration
- Faster team onboarding
- Reduces CI/CD complexity

---

## ADR-003: Backend Framework - NestJS

**Decision**: Use NestJS for the backend API.

**Reasons**:
- Modular architecture aligns with DDD principles
- Built-in dependency injection
- Excellent testing support
- Guards and interceptors for cross-cutting concerns
- Mature, battle-tested ecosystem
- Strong TypeScript-first design

---

## ADR-004: ORM - Prisma

**Decision**: Use Prisma as the ORM.

**Reasons**:
- Excellent TypeScript support with auto-generated types
- Safe migrations with rollback capability
- Developer-friendly schema definition
- Supabase compatibility
- Powerful migration tools
- Built-in query builder with type safety

---

## ADR-005: Frontend Framework - Next.js App Router

**Decision**: Use Next.js with App Router (not Pages Router).

**Reasons**:
- Server Components reduce JavaScript sent to client
- Streaming support for better perceived performance
- Built-in SEO optimizations
- Route groups for code organization
- Server Actions for seamless backend integration
- Modern, forward-looking architecture

---

## ADR-006: UI Component Library - shadcn/ui

**Decision**: Use shadcn/ui instead of Material UI or Ant Design.

**Reasons**:
- House of Zuri is a luxury fashion brand requiring full design control
- Copy-paste component architecture (not locked to library upgrades)
- Perfect for custom branding (BlackGoldWhite theme)
- Built on Radix UI primitives and TailwindCSS
- Community-driven component collection

---

## ADR-007: Forms & Validation - React Hook Form + Zod

**Decision**: Use React Hook Form for form handling and Zod for validation.

**Reasons**:
- React Hook Form: minimal re-renders, excellent performance
- Zod: composable, type-safe validation with amazing DX
- Works seamlessly together
- Currently considered one of the strongest React form solutions

---

## ADR-008: State Management - TanStack Query + Zustand

**Decision**: Use TanStack Query for server state and Zustand for client state (not Redux).

**Reasons**:
- TanStack Query: eliminates need for complex server state management
- Zustand: minimal API, 2KB bundle size vs Redux's complexity
- Significantly reduces boilerplate code
- Excellent for House of Zuri's business logic complexity
- Better separation of concerns

---

## ADR-009: Styling - TailwindCSS

**Decision**: Use TailwindCSS for styling.

**Reasons**:
- Rapid development with utility-first approach
- Ensures design consistency across the platform
- Easy theming and customization
- Brand colors (BlackGoldWhite) become theme tokens
- Smaller final bundle than traditional CSS

---

## ADR-010: Icons - Lucide

**Decision**: Use Lucide React for icons.

**Reasons**:
- Lightweight icon library (~3KB)
- Consistent icon design language
- Perfect integration with shadcn/ui
- React tree-shaking friendly
- Regular updates and excellent community

---

## ADR-011: Data Visualization - Recharts

**Decision**: Use Recharts for charts and graphs.

**Reasons**:
- Composable React components
- Built for dashboards (sales, revenue, production, inventory)
- Responsive and accessible
- Good documentation
- Lightweight alternative to Chart.js

---

## ADR-012: Data Tables - TanStack Table

**Decision**: Use TanStack Table (React Table) for data-heavy tables.

**Reasons**:
- Headless table logic (works with any styling)
- Needed for:
  - Admin Portal
  - Inventory Management
  - Orders Management
  - Customer Management
  - Reports
- Excellent performance with large datasets
- Sorting, filtering, pagination built-in

---

## ADR-013: Date Library - date-fns

**Decision**: Use date-fns instead of Moment.js.

**Reasons**:
- Smaller bundle size (no global object mutation)
- Functional programming approach
- Tree-shakeable modules
- Better performance
- Modern JavaScript patterns

---

## ADR-014: Validation Strategy - Shared Zod Schemas

**Decision**: Create shared Zod schemas in `packages/validation` that serve frontend, backend, and tests.

**Reasons**:
- Single source of truth for data validation
- Eliminates duplication between frontend and backend validators
- Type-safe across entire application
- Reduces validation bugs
- Easier maintenance and testing

**Location**: `/packages/validation`

---

## ADR-015: File Uploads - Supabase Storage

**Decision**: Use Supabase Storage for file uploads.

**Buckets**:
- `products` - Product images and variants
- `collections` - Collection marketing assets
- `measurements` - Customer measurement records and fits
- `tailoring` - Tailoring process photos and modifications
- `deliveries` - Delivery tracking and proof documents
- `avatars` - User profile pictures
- `marketing` - Marketing and promotional content

**Reasons**:
- Integrated with Supabase ecosystem
- PostgreSQL compatibility
- Row-level security
- Cost-effective
- Reliable storage solution

---

## ADR-016: Payment Processing - Paystack

**Decision**: Use Paystack as payment provider via an adapter pattern.

**Architecture**:
```
BusinessLogic
    ↓
PaymentService (interface)
    ↓
PaystackAdapter (implementation)
    ↓
Paystack API
```

**Rules**:
- Never call Paystack API directly from business logic
- All Paystack calls go through PaystackAdapter
- Enables future provider switching (Stripe, Square, etc.)

**Reasons**:
- Popular in Nigeria/Africa
- Developer-friendly API
- Competitive rates
- Excellent documentation

---

## ADR-017: Notifications - Abstract Provider Interface

**Decision**: Create an abstract NotificationService with pluggable providers.

**Architecture**:
```
NotificationService (interface)
    ├─ EmailProvider
    ├─ SMSProvider
    └─ WhatsAppProvider (future)
```

**Rules**:
- No module directly depends on specific providers
- All notifications go through NotificationService
- Easy to add new channels (WhatsApp, Slack, etc.)

**Reasons**:
- Flexibility for multi-channel notifications
- Easy to test (mock provider)
- Future-proof for new communication channels

---

## ADR-018: Logging - Pino

**Decision**: Use Pino for structured logging (not Winston).

**Reasons**:
- Significantly faster than Winston
- Structured JSON logging by default
- Better performance in production
- Excellent streaming support
- Easy integration with Sentry and log aggregators

**Configuration**: Centralized in `packages/config`

---

## ADR-019: Monitoring & Observability

**Decision**: Multi-layer monitoring approach.

**Stack**:
1. **Sentry** - Application error tracking and reporting
2. **Pino Logs** - Structured logging to file/service
3. **Health Endpoints** - `/health` endpoints on all services
4. **Supabase Metrics** - Database and storage metrics

**Reasons**:
- Comprehensive error visibility
- Performance monitoring
- Debugging capabilities
- Production readiness

---

## ADR-020: Testing Stack

**Decision**: Use tool-specific stack per platform.

**Frontend & Shared Packages**:
- **Vitest** for unit tests
  - Faster than Jest
  - ESM-native
  - Great TypeScript support

**Backend (NestJS)**:
- **Jest** for unit and integration tests (initially)
  - Seamless NestJS integration
  - Built-in mocking utilities
  - Can standardize on Vitest later if desired

**API Integration Tests**:
- **Supertest** for HTTP assertions
- Testing actual endpoints with realistic requests

**End-to-End Tests**:
- **Playwright** for full user journey testing
  - Cross-browser support
  - Great debugging tools
  - Modern async API

**Coverage Goals**:
- Unit: 70%+ coverage
- Integration: Critical paths
- E2E: Happy paths + error scenarios

---

## Summary Table

| Category | Decision | Alternative Considered |
|----------|----------|----------------------|
| Package Manager | pnpm | npm, yarn |
| Monorepo | Turborepo | Nx, Lerna |
| Backend | NestJS | Express, FastAPI |
| ORM | Prisma | TypeORM, Sequelize |
| Frontend | Next.js App Router | Remix, SvelteKit |
| UI | shadcn/ui | Material UI, Ant Design |
| Forms | React Hook Form + Zod | Formik, Final Form |
| State | TanStack Query + Zustand | Redux, MobX |
| Styling | TailwindCSS | CSS Modules, Emotion |
| Icons | Lucide | React Icons, Font Awesome |
| Charts | Recharts | Chart.js, D3.js |
| Tables | TanStack Table | AG Grid, react-table |
| Dates | date-fns | Moment.js, Day.js |
| Validation | Shared Zod | Joi, Yup |
| Files | Supabase Storage | AWS S3, Cloudinary |
| Payments | Paystack | Stripe, Square |
| Notifications | Abstract Interface | Direct integrations |
| Logging | Pino | Winston, Morgan |
| Monitoring | Sentry + Pino + Health + Supabase | DataDog, New Relic |
| Testing | Vitest + Jest + Playwright + Supertest | Cypress, Mocha |

---

## Review Process

These decisions should be reviewed:
- Quarterly or when new requirements emerge
- When team size changes significantly
- Before major refactoring initiatives
- When dependencies have breaking changes

---

*Last Updated: 2026-06-30*

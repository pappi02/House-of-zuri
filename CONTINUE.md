# House of Zuri Development Rules

## Architecture
- Follow Modular Monolith architecture.
- Follow Clean Architecture.
- Respect existing folder structure.
- Do not move files unless explicitly requested.

## Backend
- NestJS 10+
- Prisma
- PostgreSQL (Supabase)
- Repository pattern
- Dependency Injection
- DTO validation
- Proper exception handling

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Reusable components
- Prefer Server Components unless client-side state is required.

## Code Quality
- Never use `any`.
- Write production-ready code.
- Reuse existing utilities before creating new ones.
- Avoid duplicate implementations.

## Workflow
Before implementing any feature:
1. Analyze the current architecture.
2. Explain the implementation plan.
3. Implement the feature.
4. Check for compilation errors.
5. Summarize the changes.
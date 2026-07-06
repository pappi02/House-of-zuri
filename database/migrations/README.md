# Database Migrations

This project uses SQL-first migrations.

## Rules
- Never use prisma migrate in production
- All schema changes must be written in SQL
- Prisma is used only for type-safe queries

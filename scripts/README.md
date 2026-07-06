Migration runner scripts

Commands:

- Apply missing migrations (records applied files to public.schema_migrations):

```bash
node -r ts-node/register scripts/migrate.ts
```

- Show applied/pending migrations:

```bash
node -r ts-node/register scripts/migrate-status.ts
```

Notes:
- The runner will mark `0006_inventory.sql` and `0007_manufacturing.sql` as applied (without executing) if present, to avoid reapplying them when those schemas already exist in the remote DB.
- Use `TEST_DATABASE_URL` to point to the test DB; else `SUPABASE_URL` or `DATABASE_URL` will be used.

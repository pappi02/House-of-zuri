CREATE SCHEMA IF NOT EXISTS customer;

CREATE SEQUENCE IF NOT EXISTS customer.customer_number_seq START 1 INCREMENT 1;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'customer_status'
      AND typnamespace = 'customer'::regnamespace
  ) THEN
    CREATE TYPE customer.customer_status AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');
  END IF;
END $$;

ALTER TABLE customer.customers
  ADD COLUMN IF NOT EXISTS account_id UUID,
  ADD COLUMN IF NOT EXISTS customer_number VARCHAR(30),
  ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS middle_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS preferred_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS is_guest BOOLEAN,
  ADD COLUMN IF NOT EXISTS status customer.customer_status,
  ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN,
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE customer.customers
  ALTER COLUMN customer_number SET DEFAULT ('CUS-' || lpad(nextval('customer.customer_number_seq')::text, 6, '0')),
  ALTER COLUMN is_guest SET DEFAULT TRUE,
  ALTER COLUMN status SET DEFAULT 'ACTIVE',
  ALTER COLUMN marketing_opt_in SET DEFAULT FALSE;

UPDATE customer.customers
SET customer_number = COALESCE(
  customer_number,
  'CUS-' || lpad(nextval('customer.customer_number_seq')::text, 6, '0')
)
WHERE customer_number IS NULL;

ALTER TABLE customer.customers
  ALTER COLUMN email TYPE VARCHAR(255),
  ALTER COLUMN phone TYPE VARCHAR(30);

CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_customer_number
  ON customer.customers (customer_number);

CREATE INDEX IF NOT EXISTS idx_customers_email ON customer.customers (email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customer.customers (phone);
CREATE INDEX IF NOT EXISTS idx_customers_account_id ON customer.customers (account_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_customers_updated_at ON customer.customers;
CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customer.customers
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

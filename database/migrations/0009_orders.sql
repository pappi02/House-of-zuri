CREATE SCHEMA IF NOT EXISTS orders;

CREATE SEQUENCE IF NOT EXISTS orders.order_number_seq START 1;

CREATE TABLE IF NOT EXISTS orders.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE,
  customer_id uuid,
  guest_email text,
  guest_phone text,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'PENDING',
  notes text,
  total_amount numeric(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL,
  variant_id uuid,
  product_name text,
  quantity integer NOT NULL,
  unit_price numeric(12,2) NOT NULL,
  product_type text,
  requires_measurements boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders.order_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders.orders(id) ON DELETE CASCADE,
  event text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

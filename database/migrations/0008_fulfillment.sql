CREATE SCHEMA IF NOT EXISTS fulfillment;

CREATE SEQUENCE IF NOT EXISTS fulfillment.fulfillment_number_seq START 1;
CREATE SEQUENCE IF NOT EXISTS fulfillment.packing_slip_number_seq START 1;

CREATE TABLE IF NOT EXISTS fulfillment.fulfillments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fulfillment_number text UNIQUE,
  order_id uuid NOT NULL,
  status text NOT NULL,
  packing_slip_id uuid,
  dispatch_record_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fulfillment.fulfillment_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fulfillment_id uuid REFERENCES fulfillment.fulfillments(id) ON DELETE CASCADE,
  order_item_id uuid NOT NULL,
  product_id uuid NOT NULL,
  variant_id uuid,
  quantity integer NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fulfillment.packing_slips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fulfillment_id uuid REFERENCES fulfillment.fulfillments(id) ON DELETE CASCADE,
  slip_number text UNIQUE,
  items jsonb NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fulfillment.dispatch_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fulfillment_id uuid REFERENCES fulfillment.fulfillments(id) ON DELETE CASCADE,
  carrier text,
  tracking_number text,
  dispatched_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fulfillment.fulfillment_timelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fulfillment_id uuid REFERENCES fulfillment.fulfillments(id) ON DELETE CASCADE,
  event text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

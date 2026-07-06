-- Sprint 11: Manufacturing schema and sequences
CREATE SCHEMA IF NOT EXISTS manufacturing;

-- Sequences for human-friendly numbers
CREATE SEQUENCE IF NOT EXISTS manufacturing.job_number_seq START 1;
CREATE SEQUENCE IF NOT EXISTS manufacturing.work_order_number_seq START 1;

-- Manufacturing jobs (aggregate root)
CREATE TABLE IF NOT EXISTS manufacturing.manufacturing_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_number text UNIQUE,
  order_id uuid NOT NULL,
  status text,
  priority integer,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Work orders for individual order items
CREATE TABLE IF NOT EXISTS manufacturing.work_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_number text UNIQUE,
  manufacturing_job_id uuid REFERENCES manufacturing.manufacturing_jobs(id) ON DELETE CASCADE,
  order_item_id uuid,
  product_id uuid,
  variant_id uuid,
  assigned_tailor_id uuid,
  status text,
  estimated_completion_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Measurement snapshots captured at manufacturing start
CREATE TABLE IF NOT EXISTS manufacturing.measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id uuid REFERENCES manufacturing.work_orders(id) ON DELETE CASCADE,
  bust numeric,
  waist numeric,
  hip numeric,
  shoulder numeric,
  sleeve numeric,
  height numeric,
  inseam numeric,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Quality inspections per work order
CREATE TABLE IF NOT EXISTS manufacturing.quality_inspections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id uuid REFERENCES manufacturing.work_orders(id) ON DELETE CASCADE,
  status text,
  notes text,
  inspected_by uuid,
  inspected_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Timeline events for work orders
CREATE TABLE IF NOT EXISTS manufacturing.timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id uuid REFERENCES manufacturing.work_orders(id) ON DELETE CASCADE,
  event text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

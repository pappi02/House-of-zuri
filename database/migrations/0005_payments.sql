CREATE SCHEMA IF NOT EXISTS payments;

CREATE TABLE IF NOT EXISTS payments.payments (
  id UUID PRIMARY KEY,
  payment_number VARCHAR(50) NOT NULL UNIQUE,
  order_id UUID NOT NULL,
  customer_id UUID,
  gateway VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  gateway_reference VARCHAR(255),
  authorization_reference VARCHAR(255),
  paid_at TIMESTAMP WITH TIME ZONE,
  failure_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments.payment_attempts (
  id UUID PRIMARY KEY,
  payment_id UUID NOT NULL REFERENCES payments.payments(id) ON DELETE CASCADE,
  attempt_number INT NOT NULL,
  gateway_reference VARCHAR(255),
  status VARCHAR(50) NOT NULL,
  request_payload JSONB,
  response_payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments.payment_events (
  id UUID PRIMARY KEY,
  payment_id UUID NOT NULL REFERENCES payments.payments(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  payload JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments.outbox_events (
  id UUID PRIMARY KEY,
  aggregate_type VARCHAR(100) NOT NULL,
  aggregate_id VARCHAR(100) NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

CREATE SEQUENCE IF NOT EXISTS payments.payment_number_seq START 1;

CREATE SCHEMA IF NOT EXISTS inventory;

CREATE TABLE IF NOT EXISTS inventory.inventory_items (
  id UUID PRIMARY KEY,
  inventory_number VARCHAR(50) NOT NULL UNIQUE,
  product_id UUID NOT NULL,
  variant_id UUID NOT NULL,
  sku VARCHAR(255),
  on_hand INT NOT NULL DEFAULT 0,
  reserved INT NOT NULL DEFAULT 0,
  minimum_stock INT,
  maximum_stock INT,
  reorder_level INT,
  status VARCHAR(50),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory.stock_reservations (
  id UUID PRIMARY KEY,
  order_id UUID NOT NULL,
  order_item_id UUID NOT NULL,
  inventory_item_id UUID NOT NULL REFERENCES inventory.inventory_items(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory.inventory_movements (
  id UUID PRIMARY KEY,
  inventory_item_id UUID NOT NULL REFERENCES inventory.inventory_items(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE SEQUENCE IF NOT EXISTS inventory.inventory_number_seq START 1;

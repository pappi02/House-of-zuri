-- Catalog Module Migration
-- Sprint 6: Catalog Module

-- Ensure catalog schema exists
CREATE SCHEMA IF NOT EXISTS catalog;

-- Product Type Enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_type') THEN
    CREATE TYPE catalog.product_type AS ENUM ('READY_MADE', 'MADE_TO_ORDER', 'CUSTOM');
  END IF;
END $$;

-- Product Status Enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_status') THEN
    CREATE TYPE catalog.product_status AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED', 'OUT_OF_STOCK');
  END IF;
END $$;

-- Product Number Sequence
CREATE SEQUENCE IF NOT EXISTS catalog.product_number_seq START 1 INCREMENT 1;

-- Category Table (Hierarchical)
CREATE TABLE IF NOT EXISTS catalog.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NULL REFERENCES catalog.categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Collection Table
CREATE TABLE IF NOT EXISTS catalog.collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Size Table
CREATE TABLE IF NOT EXISTS catalog.sizes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  code VARCHAR(10) NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Color Table
CREATE TABLE IF NOT EXISTS catalog.colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  hex_code VARCHAR(7) NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Product Table
CREATE TABLE IF NOT EXISTS catalog.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_number VARCHAR(30) NOT NULL DEFAULT ('PRD-' || lpad(nextval('catalog.product_number_seq')::text, 6, '0')) UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  short_description TEXT NULL,
  category_id UUID NOT NULL REFERENCES catalog.categories(id) ON DELETE RESTRICT,
  collection_id UUID NULL REFERENCES catalog.collections(id) ON DELETE SET NULL,
  product_type catalog.product_type NOT NULL DEFAULT 'READY_MADE',
  status catalog.product_status NOT NULL DEFAULT 'DRAFT',
  base_price DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
  care_instructions TEXT NULL,
  estimated_production_days INTEGER NULL,
  seo_title VARCHAR(255) NULL,
  seo_description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Product Variant Table
CREATE TABLE IF NOT EXISTS catalog.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
  sku VARCHAR(100) NOT NULL UNIQUE,
  color_id UUID NOT NULL REFERENCES catalog.colors(id) ON DELETE RESTRICT,
  size_id UUID NOT NULL REFERENCES catalog.sizes(id) ON DELETE RESTRICT,
  price_override DECIMAL(12, 2) NULL,
  weight_grams INTEGER NULL,
  barcode VARCHAR(100) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, color_id, size_id)
);

-- Product Image Table
CREATE TABLE IF NOT EXISTS catalog.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES catalog.products(id) ON DELETE CASCADE,
  storage_path VARCHAR(500) NOT NULL,
  public_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for Products
CREATE INDEX IF NOT EXISTS idx_products_slug ON catalog.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON catalog.products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_collection_id ON catalog.products (collection_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON catalog.products (status);
CREATE INDEX IF NOT EXISTS idx_products_product_type ON catalog.products (product_type);
CREATE INDEX IF NOT EXISTS idx_products_featured ON catalog.products (featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON catalog.products (new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_product_number ON catalog.products (product_number);

-- Indexes for Product Variants
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON catalog.product_variants (product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON catalog.product_variants (sku);
CREATE INDEX IF NOT EXISTS idx_product_variants_color_id ON catalog.product_variants (color_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_size_id ON catalog.product_variants (size_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_is_active ON catalog.product_variants (is_active);

-- Indexes for Product Images
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON catalog.product_images (product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_is_primary ON catalog.product_images (is_primary);

-- Indexes for Categories
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON catalog.categories (parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON catalog.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON catalog.categories (is_active);

-- Indexes for Collections
CREATE INDEX IF NOT EXISTS idx_collections_slug ON catalog.collections (slug);
CREATE INDEX IF NOT EXISTS idx_collections_is_active ON catalog.collections (is_active);

-- Indexes for Sizes
CREATE INDEX IF NOT EXISTS idx_sizes_code ON catalog.sizes (code);
CREATE INDEX IF NOT EXISTS idx_sizes_is_active ON catalog.sizes (is_active);

-- Indexes for Colors
CREATE INDEX IF NOT EXISTS idx_colors_name ON catalog.colors (name);
CREATE INDEX IF NOT EXISTS idx_colors_is_active ON catalog.colors (is_active);

-- Updated At Trigger for Categories
DROP TRIGGER IF EXISTS trg_categories_updated_at ON catalog.categories;
CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON catalog.categories
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Collections
DROP TRIGGER IF EXISTS trg_collections_updated_at ON catalog.collections;
CREATE TRIGGER trg_collections_updated_at
BEFORE UPDATE ON catalog.collections
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Sizes
DROP TRIGGER IF EXISTS trg_sizes_updated_at ON catalog.sizes;
CREATE TRIGGER trg_sizes_updated_at
BEFORE UPDATE ON catalog.sizes
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Colors
DROP TRIGGER IF EXISTS trg_colors_updated_at ON catalog.colors;
CREATE TRIGGER trg_colors_updated_at
BEFORE UPDATE ON catalog.colors
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Products
DROP TRIGGER IF EXISTS trg_products_updated_at ON catalog.products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON catalog.products
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Product Variants
DROP TRIGGER IF EXISTS trg_product_variants_updated_at ON catalog.product_variants;
CREATE TRIGGER trg_product_variants_updated_at
BEFORE UPDATE ON catalog.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Updated At Trigger for Product Images
DROP TRIGGER IF EXISTS trg_product_images_updated_at ON catalog.product_images;
CREATE TRIGGER trg_product_images_updated_at
BEFORE UPDATE ON catalog.product_images
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Insert default sizes
INSERT INTO catalog.sizes (name, code, sort_order) VALUES
('Extra Small', 'XS', 1),
('Small', 'S', 2),
('Medium', 'M', 3),
('Large', 'L', 4),
('Extra Large', 'XL', 5),
('Double Extra Large', 'XXL', 6)
ON CONFLICT (code) DO NOTHING;

-- Insert default colors
INSERT INTO catalog.colors (name, hex_code, sort_order) VALUES
('Black', '#000000', 1),
('White', '#FFFFFF', 2),
('Gold', '#FFD700', 3),
('Emerald', '#50C878', 4),
('Navy', '#000080', 5),
('Burgundy', '#800020', 6),
('Silver', '#C0C0C0', 7),
('Champagne', '#F7E7CE', 8)
ON CONFLICT (name) DO NOTHING;
import type { CatalogCategory, CatalogCollection, CatalogProduct, ProductStatus, ProductType } from "@/src/types/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

const sampleCollections: CatalogCollection[] = [
  {
    id: "col-graduation",
    slug: "graduation",
    name: "Graduation",
    description: "Refined occasionwear for milestones, celebrations, and a memorable first impression.",
    imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    productCount: 6,
    featuredProduct: {
      id: "prod-1",
      slug: "elegant-satin-graduation-dress",
      name: "Elegant Satin Graduation Dress",
      description: "A sculpted satin gown designed for elegant ceremony dressing.",
      price: 28500,
      currency: "KES",
      productType: "READY_MADE",
      status: "ACTIVE",
      collection: "Graduation",
      collectionId: "col-graduation",
      availability: "In Stock",
      images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"],
      colors: ["Ivory", "Blush"],
      sizes: ["XS", "S", "M", "L"],
      fabric: "Satin",
      sku: "HZ-GRAD-001",
    },
  },
  {
    id: "col-corporate",
    slug: "corporate",
    name: "Corporate",
    description: "Sharp tailoring and polished essentials for the modern professional wardrobe.",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    productCount: 5,
    featuredProduct: {
      id: "prod-2",
      slug: "structured-blazer-set",
      name: "Structured Blazer Set",
      description: "A crisp, elevated set designed for leadership, meetings, and evenings out.",
      price: 22400,
      currency: "KES",
      productType: "MADE_TO_ORDER",
      status: "ACTIVE",
      collection: "Corporate",
      collectionId: "col-corporate",
      availability: "Made to Order",
      images: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"],
      colors: ["Black", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      fabric: "Wool blend",
      sku: "HZ-CORP-002",
      estimatedProductionDays: 10,
    },
  },
  {
    id: "col-evening",
    slug: "evening",
    name: "Evening",
    description: "Statement pieces for gala nights, dinner dates, and celebratory dressing.",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    productCount: 4,
    featuredProduct: {
      id: "prod-3",
      slug: "midnight-velvet-gown",
      name: "Midnight Velvet Gown",
      description: "The perfect velvet evening silhouette with a quietly dramatic finish.",
      price: 31800,
      currency: "KES",
      productType: "CUSTOM",
      status: "ACTIVE",
      collection: "Evening",
      collectionId: "col-evening",
      availability: "Custom",
      images: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"],
      colors: ["Midnight", "Emerald"],
      sizes: ["XS", "S", "M", "L"],
      fabric: "Velvet",
      sku: "HZ-EVE-003",
    },
  },
];

const sampleProducts: CatalogProduct[] = [
  {
    id: "prod-1",
    slug: "elegant-satin-graduation-dress",
    name: "Elegant Satin Graduation Dress",
    description: "A sculpted satin gown designed for elegant ceremony dressing and celebratory evenings.",
    shortDescription: "Satin graduation dress",
    price: 28500,
    currency: "KES",
    productType: "READY_MADE",
    status: "ACTIVE",
    collection: "Graduation",
    collectionId: "col-graduation",
    category: "Dresses",
    categoryId: "cat-dresses",
    featured: true,
    newArrival: true,
    availability: "In Stock",
    colors: ["Ivory", "Blush"],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Satin",
    sku: "HZ-GRAD-001",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    ],
    careInstructions: "Dry clean only. Steam lightly to preserve the satin finish.",
    estimatedProductionDays: 3,
    seoTitle: "Elegant Satin Graduation Dress | House of Zuri",
    seoDescription: "Discover the elegant satin graduation dress at House of Zuri crafted for timeless celebrations.",
  },
  {
    id: "prod-2",
    slug: "structured-blazer-set",
    name: "Structured Blazer Set",
    description: "A crisp, elevated set designed for leadership, meetings, and evenings out.",
    shortDescription: "Tailored blazer set",
    price: 22400,
    currency: "KES",
    productType: "MADE_TO_ORDER",
    status: "ACTIVE",
    collection: "Corporate",
    collectionId: "col-corporate",
    category: "Tailoring",
    categoryId: "cat-tailoring",
    featured: true,
    availability: "Made to Order",
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Wool blend",
    sku: "HZ-CORP-002",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    ],
    careInstructions: "Dry clean only and store on padded hangers.",
    estimatedProductionDays: 10,
    seoTitle: "Structured Blazer Set | House of Zuri",
    seoDescription: "A tailored corporate blazer set made for polished, modern dressing.",
  },
  {
    id: "prod-3",
    slug: "midnight-velvet-gown",
    name: "Midnight Velvet Gown",
    description: "The perfect velvet evening silhouette with a quietly dramatic finish.",
    shortDescription: "Velvet evening gown",
    price: 31800,
    currency: "KES",
    productType: "CUSTOM",
    status: "ACTIVE",
    collection: "Evening",
    collectionId: "col-evening",
    category: "Eveningwear",
    categoryId: "cat-eveningwear",
    featured: true,
    availability: "Custom",
    colors: ["Midnight", "Emerald"],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Velvet",
    sku: "HZ-EVE-003",
    images: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    ],
    careInstructions: "Hand wash delicate trim and steam with care.",
    estimatedProductionDays: 14,
    seoTitle: "Midnight Velvet Gown | House of Zuri",
    seoDescription: "A custom velvet evening gown crafted for exceptional events and celebrations.",
  },
  {
    id: "prod-4",
    slug: "luxe-linen-trouser",
    name: "Luxe Linen Trouser",
    description: "A softly structured trouser designed for elevated everyday dressing.",
    shortDescription: "Linen tailored trouser",
    price: 16800,
    currency: "KES",
    productType: "READY_MADE",
    status: "ACTIVE",
    collection: "Ready Made",
    collectionId: "col-ready-made",
    category: "Trousers",
    categoryId: "cat-trousers",
    availability: "In Stock",
    colors: ["Sand", "Stone"],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Linen",
    sku: "HZ-RT-004",
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"],
    careInstructions: "Machine wash cold and line dry.",
  },
];

const sampleCategories = [
  { id: "cat-dresses", slug: "dresses", name: "Dresses" },
  { id: "cat-tailoring", slug: "tailoring", name: "Tailoring" },
  { id: "cat-eveningwear", slug: "eveningwear", name: "Eveningwear" },
  { id: "cat-trousers", slug: "trousers", name: "Trousers" },
];

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Catalog request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

function normalizeProduct(product: Partial<CatalogProduct> & Record<string, unknown>): CatalogProduct {
  const price = typeof product.price === "number" ? product.price : Number(product.basePrice ?? 0);
  return {
    id: String(product.id ?? ""),
    slug: String(product.slug ?? ""),
    name: String(product.name ?? "Untitled product"),
    description: typeof product.description === "string" ? product.description : null,
    shortDescription: typeof product.shortDescription === "string" ? product.shortDescription : null,
    price: Number.isFinite(price) ? price : 0,
    currency: typeof product.currency === "string" ? product.currency : "KES",
    productType: (product.productType as ProductType) ?? "READY_MADE",
    status: (product.status as ProductStatus) ?? "ACTIVE",
    collection: typeof product.collection === "string" ? product.collection : null,
    collectionId: typeof product.collectionId === "string" ? product.collectionId : null,
    category: typeof product.category === "string" ? product.category : null,
    categoryId: typeof product.categoryId === "string" ? product.categoryId : null,
    featured: Boolean(product.featured),
    newArrival: Boolean(product.newArrival),
    careInstructions: typeof product.careInstructions === "string" ? product.careInstructions : null,
    estimatedProductionDays: typeof product.estimatedProductionDays === "number" ? product.estimatedProductionDays : undefined,
    seoTitle: typeof product.seoTitle === "string" ? product.seoTitle : null,
    seoDescription: typeof product.seoDescription === "string" ? product.seoDescription : null,
    images: Array.isArray(product.images) ? (product.images as string[]) : undefined,
    colors: Array.isArray(product.colors) ? (product.colors as string[]) : undefined,
    sizes: Array.isArray(product.sizes) ? (product.sizes as string[]) : undefined,
    availability: (product.availability as CatalogProduct["availability"]) ?? "In Stock",
    sku: typeof product.sku === "string" ? product.sku : undefined,
    fabric: typeof product.fabric === "string" ? product.fabric : undefined,
  };
}

export async function getCollections(): Promise<CatalogCollection[]> {
  try {
    const collections = await fetchJson<CatalogCollection[]>("/products/collections");
    return collections.length ? collections : sampleCollections;
  } catch {
    return sampleCollections;
  }
}

export async function getCollection(slug: string): Promise<CatalogCollection | null> {
  try {
    const collection = await fetchJson<CatalogCollection>(`/products/collections/${slug}`);
    return collection ?? null;
  } catch {
    return sampleCollections.find((item) => item.slug === slug) ?? null;
  }
}

export async function getCategories(): Promise<CatalogCategory[]> {
  try {
    const categories = await fetchJson<CatalogCategory[]>("/products/categories");
    return categories.length ? categories : sampleCategories;
  } catch {
    return sampleCategories;
  }
}

export async function getProducts(params?: Record<string, string | number | undefined>): Promise<CatalogProduct[]> {
  try {
    const query = new URLSearchParams();
    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === "") return;
      query.set(key, String(value));
    });

    const products = await fetchJson<CatalogProduct[]>(`/products${query.toString() ? `?${query.toString()}` : ""}`);
    return products.length ? products.map(normalizeProduct) : sampleProducts;
  } catch {
    return sampleProducts;
  }
}

export async function getProduct(slug: string): Promise<CatalogProduct | null> {
  try {
    const product = await fetchJson<CatalogProduct>(`/products/${slug}`);
    return normalizeProduct(product);
  } catch {
    return sampleProducts.find((item) => item.slug === slug) ?? null;
  }
}

export async function searchProducts(query: string): Promise<CatalogProduct[]> {
  try {
    const products = await fetchJson<CatalogProduct[]>(`/products?keyword=${encodeURIComponent(query)}`);
    return products.length ? products.map(normalizeProduct) : sampleProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  } catch {
    return sampleProducts.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }
}

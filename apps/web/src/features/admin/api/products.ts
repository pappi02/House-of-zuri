import { http } from "@/src/lib/http";

export async function getAdminProducts() {
  try {
    const products = await http<any[]>("/products");
    return products.map((product) => ({
      id: String(product.id ?? product.productNumber ?? product.slug ?? ""),
      name: String(product.name ?? product.title ?? "Untitled product"),
      type: String(product.productType ?? product.type ?? "Unknown"),
      price:
        typeof product.price === "number"
          ? `KES ${product.price.toLocaleString()}`
          : String(product.price ?? "KES 0"),
      status: String(product.status ?? "Draft"),
    }));
  } catch (error) {
    console.error("Failed to load admin products", error);
    return [];
  }
}

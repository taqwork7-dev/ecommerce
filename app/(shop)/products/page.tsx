import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/products/queries";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="mt-2 text-gray-600">
          Browse our latest products.
        </p>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}
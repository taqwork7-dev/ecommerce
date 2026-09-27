import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductVariantSelector } from "@/components/product/ProductVariantSelector";
import { getProductBySlug } from "@/lib/products/queries";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        <div>
          <ProductInfo
            name={product.name}
            description={product.description}
            brand={product.brand}
            category={product.category}
          />

          <ProductVariantSelector
            variants={product.variants.map((variant) => ({
              id: variant.id,
              sku: variant.sku,
              price: variant.price.toString(),
              color: variant.color,
              size: variant.size,
              inventory: variant.inventory
                ? {
                    available: variant.inventory.available,
                  }
                : null,
            }))}
          />
        </div>
      </div>
    </main>
  );
}
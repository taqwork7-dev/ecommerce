import Link from "next/link";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string | null;
    compareAtPrice: string | null;
    images: {
      url: string;
      alt: string | null;
    }[];
    category: {
      name: string;
      slug: string;
    };
    brand: {
      name: string;
      slug: string;
    } | null;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          {image ? (
            <img
              src={image.url}
              alt={image.alt ?? product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {product.brand?.name}
          </p>

          <h2 className="mt-1 font-semibold">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            {product.price && (
              <span className="font-medium">
                {Number(product.price).toLocaleString("vi-VN")} ₫
              </span>
            )}

            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                {Number(product.compareAtPrice).toLocaleString("vi-VN")} ₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
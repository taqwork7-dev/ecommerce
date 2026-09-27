type ProductInfoProps = {
  name: string;
  description: string | null;
  brand: {
    name: string;
  } | null;
  category: {
    name: string;
  };
};

export function ProductInfo({
  name,
  description,
  brand,
  category,
}: ProductInfoProps) {
  return (
    <div>
      <div className="flex gap-2 text-sm text-gray-500">
        {brand && <span>{brand.name}</span>}
        <span>•</span>
        <span>{category.name}</span>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {name}
      </h1>

      {description && (
        <p className="mt-4 leading-7 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
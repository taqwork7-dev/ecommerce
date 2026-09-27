"use client";

import { useState } from "react";

type Variant = {
  id: string;
  sku: string;
  price: string;
  color: string | null;
  size: string | null;
  inventory: {
    available: number;
  } | null;
};

type ProductVariantSelectorProps = {
  variants: Variant[];
};

export function ProductVariantSelector({
  variants,
}: ProductVariantSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id,
  );

  const selectedVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  if (variants.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="font-semibold">Options</h2>

      <div className="mt-3 flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isOutOfStock =
            !variant.inventory ||
            variant.inventory.available <= 0;

          return (
            <button
              key={variant.id}
              type="button"
              disabled={isOutOfStock}
              onClick={() =>
                setSelectedVariantId(variant.id)
              }
              className={`rounded-lg border px-4 py-3 text-left ${
                isSelected
                  ? "border-black"
                  : "border-gray-200"
              } ${
                isOutOfStock
                  ? "cursor-not-allowed opacity-40"
                  : ""
              }`}
            >
              <div className="font-medium">
                {variant.size ?? variant.color ?? variant.sku}
              </div>

              <div className="mt-1 text-sm text-gray-500">
                {Number(variant.price).toLocaleString("vi-VN")} ₫
              </div>
            </button>
          );
        })}
      </div>

      {selectedVariant && (
        <div className="mt-4 text-sm text-gray-600">
          {selectedVariant.inventory &&
          selectedVariant.inventory.available > 0
            ? `${selectedVariant.inventory.available} available`
            : "Out of stock"}
        </div>
      )}
    </div>
  );
}
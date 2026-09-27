type ProductGalleryProps = {
  images: {
    id: string;
    url: string;
    alt: string | null;
  }[];
  productName: string;
};

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const mainImage = images[0];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt ?? productName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src={image.url}
                alt={image.alt ?? productName}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
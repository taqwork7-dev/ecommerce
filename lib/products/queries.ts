import { prisma } from "@/lib/db/prisma";

const productListSelect = {
  id: true,
  name: true,
  slug: true,
  createdAt: true,

  category: {
    select: {
      name: true,
      slug: true,
    },
  },

  brand: {
    select: {
      name: true,
      slug: true,
    },
  },

  images: {
    select: {
      url: true,
      alt: true,
    },
    orderBy: {
      sortOrder: "asc" as const,
    },
    take: 1,
  },

  variants: {
    select: {
      price: true,
      compareAtPrice: true,
    },
    orderBy: {
      price: "asc" as const,
    },
    take: 1,
  },
};

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
    },
    select: productListSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    price: product.variants[0]?.price.toString() ?? null,
    compareAtPrice:
      product.variants[0]?.compareAtPrice?.toString() ?? null,
    variants: undefined,
  }));
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      category: true,
      brand: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },

      variants: {
        include: {
          inventory: true,
        },
        orderBy: {
          price: "asc",
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return product;
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    select: productListSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    price: product.variants[0]?.price.toString() ?? null,
    compareAtPrice:
      product.variants[0]?.compareAtPrice?.toString() ?? null,
    variants: undefined,
  }));
}

export async function getProductsByCategory(categorySlug: string) {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      category: {
        slug: categorySlug,
      },
    },
    select: productListSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    price: product.variants[0]?.price.toString() ?? null,
    compareAtPrice:
      product.variants[0]?.compareAtPrice?.toString() ?? null,
    variants: undefined,
  }));
}
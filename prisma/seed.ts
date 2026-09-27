import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================================
  // CATEGORIES
  // ============================================================

  const electronics = await prisma.category.upsert({
    where: {
      slug: "electronics",
    },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and accessories.",
    },
  });

  const fashion = await prisma.category.upsert({
    where: {
      slug: "fashion",
    },
    update: {},
    create: {
      name: "Fashion",
      slug: "fashion",
      description: "Clothing, shoes and fashion accessories.",
    },
  });

  const accessories = await prisma.category.upsert({
    where: {
      slug: "accessories",
    },
    update: {},
    create: {
      name: "Accessories",
      slug: "accessories",
      description: "Useful accessories for everyday life.",
    },
  });

  // ============================================================
  // BRANDS
  // ============================================================

  const apple = await prisma.brand.upsert({
    where: {
      slug: "apple",
    },
    update: {},
    create: {
      name: "Apple",
      slug: "apple",
    },
  });

  const samsung = await prisma.brand.upsert({
    where: {
      slug: "samsung",
    },
    update: {},
    create: {
      name: "Samsung",
      slug: "samsung",
    },
  });

  const nike = await prisma.brand.upsert({
    where: {
      slug: "nike",
    },
    update: {},
    create: {
      name: "Nike",
      slug: "nike",
    },
  });

  // ============================================================
  // PRODUCTS
  // ============================================================

  const iphone = await prisma.product.upsert({
    where: {
      slug: "iphone-17",
    },
    update: {},
    create: {
      name: "iPhone 17",
      slug: "iphone-17",
      description: "Latest generation Apple smartphone.",
      categoryId: electronics.id,
      brandId: apple.id,
      isPublished: true,
      isFeatured: true,

      variants: {
        create: [
          {
            sku: "IPHONE17-BLK-256",
            price: 24990000,
            color: "Black",
            size: "256GB",

            inventory: {
              create: {
                available: 50,
              },
            },
          },
          {
            sku: "IPHONE17-WHT-256",
            price: 24990000,
            color: "White",
            size: "256GB",

            inventory: {
              create: {
                available: 40,
              },
            },
          },
        ],
      },

      images: {
        create: [
          {
            url: "https://placehold.co/800x800?text=iPhone+17",
            alt: "iPhone 17",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const galaxy = await prisma.product.upsert({
    where: {
      slug: "samsung-galaxy-s26",
    },
    update: {},
    create: {
      name: "Samsung Galaxy S26",
      slug: "samsung-galaxy-s26",
      description: "Samsung flagship smartphone.",
      categoryId: electronics.id,
      brandId: samsung.id,
      isPublished: true,
      isFeatured: true,

      variants: {
        create: [
          {
            sku: "GALAXY-S26-BLK-256",
            price: 22990000,
            color: "Black",
            size: "256GB",

            inventory: {
              create: {
                available: 35,
              },
            },
          },
          {
            sku: "GALAXY-S26-BLU-512",
            price: 25990000,
            color: "Blue",
            size: "512GB",

            inventory: {
              create: {
                available: 20,
              },
            },
          },
        ],
      },

      images: {
        create: [
          {
            url: "https://placehold.co/800x800?text=Galaxy+S26",
            alt: "Samsung Galaxy S26",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const airMax = await prisma.product.upsert({
    where: {
      slug: "nike-air-max",
    },
    update: {},
    create: {
      name: "Nike Air Max",
      slug: "nike-air-max",
      description: "Classic Nike running shoes.",
      categoryId: fashion.id,
      brandId: nike.id,
      isPublished: true,
      isFeatured: true,

      variants: {
        create: [
          {
            sku: "AIRMAX-BLK-40",
            price: 3200000,
            color: "Black",
            size: "40",

            inventory: {
              create: {
                available: 25,
              },
            },
          },
          {
            sku: "AIRMAX-BLK-41",
            price: 3200000,
            color: "Black",
            size: "41",

            inventory: {
              create: {
                available: 30,
              },
            },
          },
          {
            sku: "AIRMAX-WHT-42",
            price: 3500000,
            color: "White",
            size: "42",

            inventory: {
              create: {
                available: 15,
              },
            },
          },
        ],
      },

      images: {
        create: [
          {
            url: "https://placehold.co/800x800?text=Nike+Air+Max",
            alt: "Nike Air Max",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  const airpods = await prisma.product.upsert({
    where: {
      slug: "airpods-pro",
    },
    update: {},
    create: {
      name: "AirPods Pro",
      slug: "airpods-pro",
      description: "Wireless noise-cancelling earbuds.",
      categoryId: accessories.id,
      brandId: apple.id,
      isPublished: true,
      isFeatured: false,

      variants: {
        create: [
          {
            sku: "AIRPODS-PRO-2",
            price: 6490000,

            inventory: {
              create: {
                available: 45,
              },
            },
          },
        ],
      },

      images: {
        create: [
          {
            url: "https://placehold.co/800x800?text=AirPods+Pro",
            alt: "AirPods Pro",
            sortOrder: 0,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed");

  console.log({
    categories: 3,
    brands: 3,
    products: [
      iphone.name,
      galaxy.name,
      airMax.name,
      airpods.name,
    ],
  });
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
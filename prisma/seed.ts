import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PLACEHOLDER_IMAGES = {
  shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
  blanket:
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&h=800&fit=crop",
  home: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
};

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const shoes = await prisma.category.create({
    data: { name: "Shoes", slug: "shoes" },
  });
  const blankets = await prisma.category.create({
    data: { name: "Blankets", slug: "blankets" },
  });
  const home = await prisma.category.create({
    data: { name: "Home", slug: "home" },
  });

  const runner = await prisma.product.create({
    data: {
      name: "Classic Running Shoes",
      slug: "classic-running-shoes",
      description:
        "Lightweight running shoes with cushioned sole. Ideal for daily wear and light jogging.",
      images: JSON.stringify([PLACEHOLDER_IMAGES.shoes]),
      featured: true,
      categoryId: shoes.id,
      variants: {
        create: [
          { sku: "RUN-BLK-40", size: "40", color: "Black", price: 4500, stock: 12 },
          { sku: "RUN-BLK-42", size: "42", color: "Black", price: 4500, stock: 8 },
          { sku: "RUN-WHT-41", size: "41", color: "White", price: 4700, stock: 5 },
          { sku: "RUN-RED-43", size: "43", color: "Red", price: 4800, stock: 3 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Casual Sneakers",
      slug: "casual-sneakers",
      description: "Comfortable everyday sneakers with breathable mesh upper.",
      images: JSON.stringify([PLACEHOLDER_IMAGES.shoes]),
      featured: true,
      categoryId: shoes.id,
      variants: {
        create: [
          { sku: "SNK-GRY-40", size: "40", color: "Grey", price: 3200, stock: 15 },
          { sku: "SNK-GRY-42", size: "42", color: "Grey", price: 3200, stock: 10 },
          { sku: "SNK-BLU-41", size: "41", color: "Blue", price: 3300, stock: 7 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Fleece Winter Blanket",
      slug: "fleece-winter-blanket",
      description:
        "Soft fleece blanket for cold nights. Machine washable, available in multiple colors.",
      images: JSON.stringify([PLACEHOLDER_IMAGES.blanket]),
      featured: true,
      categoryId: blankets.id,
      variants: {
        create: [
          { sku: "BLN-GRY-DBL", size: "Double", color: "Grey", price: 2800, stock: 20 },
          { sku: "BLN-NAV-KNG", size: "King", color: "Navy", price: 3500, stock: 12 },
          { sku: "BLN-BGE-SNG", size: "Single", color: "Beige", price: 2200, stock: 18 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Cotton Throw Blanket",
      slug: "cotton-throw-blanket",
      description: "Light cotton throw for sofas and beds. Breathable and durable.",
      images: JSON.stringify([PLACEHOLDER_IMAGES.blanket]),
      featured: false,
      categoryId: blankets.id,
      variants: {
        create: [
          { sku: "THR-CRM-STD", size: "Standard", color: "Cream", price: 1800, stock: 25 },
          { sku: "THR-GRN-STD", size: "Standard", color: "Green", price: 1800, stock: 14 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Decorative Cushion Set",
      slug: "decorative-cushion-set",
      description: "Set of 2 decorative cushions for living room or bedroom.",
      images: JSON.stringify([PLACEHOLDER_IMAGES.home]),
      featured: false,
      categoryId: home.id,
      variants: {
        create: [
          { sku: "CUS-TEAL-2P", size: "45x45cm", color: "Teal", price: 1500, stock: 30 },
          { sku: "CUS-RUST-2P", size: "45x45cm", color: "Rust", price: 1500, stock: 22 },
        ],
      },
    },
  });

  await prisma.paymentSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      jazzcashNumber: process.env.JAZZCASH_NUMBER ?? "0300-0000000",
      easypaisaNumber: process.env.EASYPAISA_NUMBER ?? "0300-0000000",
      bankName: process.env.BANK_NAME ?? "HBL",
      accountTitle: process.env.BANK_ACCOUNT_TITLE ?? "AG Traders",
      accountNumber: process.env.BANK_ACCOUNT_NUMBER ?? "0000-0000-0000-0000",
      iban: process.env.BANK_IBAN ?? "PK00HABB0000000000000000",
    },
    update: {},
  });

  console.log("Seed complete:", { runner: runner.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

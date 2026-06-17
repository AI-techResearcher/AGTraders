import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES = {
  footwear:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
  blanket:
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&h=800&fit=crop",
  hardware:
    "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=800&fit=crop",
  clearing:
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=800&fit=crop",
  realEstate:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
  trading:
    "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=1200&h=800&fit=crop",
};

async function main() {
  // Wipe in dependency order
  await prisma.serviceInquiry.deleteMany();
  await prisma.service.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ---- Item categories ----
  const footwear = await prisma.category.create({
    data: {
      name: "Footwear",
      slug: "footwear",
      description: "Wholesale shoes and sneakers for retailers and distributors.",
      image: IMAGES.footwear,
      sortOrder: 1,
    },
  });
  const blankets = await prisma.category.create({
    data: {
      name: "Blankets",
      slug: "blankets",
      description: "Bulk blankets and throws for hospitality, retail, and export.",
      image: IMAGES.blanket,
      sortOrder: 2,
    },
  });
  const hardware = await prisma.category.create({
    data: {
      name: "Hardware",
      slug: "hardware",
      description: "Tools and fittings supplied in wholesale quantities.",
      image: IMAGES.hardware,
      sortOrder: 3,
    },
  });

  // ---- Products (with wholesale MOQ) ----
  const runner = await prisma.product.create({
    data: {
      name: "Classic Running Shoes",
      slug: "classic-running-shoes",
      description:
        "Lightweight running shoes with cushioned sole. Ideal for daily wear and light jogging. Available for bulk supply.",
      images: JSON.stringify([IMAGES.footwear]),
      featured: true,
      minOrderQty: 12,
      unit: "pairs",
      categoryId: footwear.id,
      variants: {
        create: [
          { sku: "RUN-BLK-40", size: "40", color: "Black", price: 4500, stock: 120 },
          { sku: "RUN-BLK-42", size: "42", color: "Black", price: 4500, stock: 80 },
          { sku: "RUN-WHT-41", size: "41", color: "White", price: 4700, stock: 50 },
          { sku: "RUN-RED-43", size: "43", color: "Red", price: 4800, stock: 30 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Casual Sneakers",
      slug: "casual-sneakers",
      description:
        "Comfortable everyday sneakers with breathable mesh upper. Supplied in mixed-size cartons.",
      images: JSON.stringify([IMAGES.footwear]),
      featured: true,
      minOrderQty: 12,
      unit: "pairs",
      categoryId: footwear.id,
      variants: {
        create: [
          { sku: "SNK-GRY-40", size: "40", color: "Grey", price: 3200, stock: 150 },
          { sku: "SNK-GRY-42", size: "42", color: "Grey", price: 3200, stock: 100 },
          { sku: "SNK-BLU-41", size: "41", color: "Blue", price: 3300, stock: 70 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Fleece Winter Blanket",
      slug: "fleece-winter-blanket",
      description:
        "Soft fleece blanket for cold climates. Machine washable, available in multiple colors. Ideal for bulk hospitality orders.",
      images: JSON.stringify([IMAGES.blanket]),
      featured: true,
      minOrderQty: 20,
      unit: "pcs",
      categoryId: blankets.id,
      variants: {
        create: [
          { sku: "BLN-GRY-DBL", size: "Double", color: "Grey", price: 2800, stock: 200 },
          { sku: "BLN-NAV-KNG", size: "King", color: "Navy", price: 3500, stock: 120 },
          { sku: "BLN-BGE-SNG", size: "Single", color: "Beige", price: 2200, stock: 180 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Cotton Throw Blanket",
      slug: "cotton-throw-blanket",
      description:
        "Light cotton throw for sofas and beds. Breathable and durable. Supplied wholesale.",
      images: JSON.stringify([IMAGES.blanket]),
      featured: false,
      minOrderQty: 20,
      unit: "pcs",
      categoryId: blankets.id,
      variants: {
        create: [
          { sku: "THR-CRM-STD", size: "Standard", color: "Cream", price: 1800, stock: 250 },
          { sku: "THR-GRN-STD", size: "Standard", color: "Green", price: 1800, stock: 140 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Heavy-Duty Tool Set",
      slug: "heavy-duty-tool-set",
      description:
        "Chrome-vanadium hand tool set for workshops and resellers. Packed in protective cases for bulk shipment.",
      images: JSON.stringify([IMAGES.hardware]),
      featured: true,
      minOrderQty: 50,
      unit: "pcs",
      categoryId: hardware.id,
      variants: {
        create: [
          { sku: "TOOL-STD-24", size: "24-piece", color: "Steel", price: 5200, stock: 300 },
          { sku: "TOOL-PRO-48", size: "48-piece", color: "Steel", price: 9500, stock: 160 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Stainless Steel Door Hinges",
      slug: "stainless-steel-door-hinges",
      description:
        "Corrosion-resistant stainless steel hinges for doors and cabinets. Sold in wholesale cartons.",
      images: JSON.stringify([IMAGES.hardware]),
      featured: false,
      minOrderQty: 100,
      unit: "pcs",
      categoryId: hardware.id,
      variants: {
        create: [
          { sku: "HNG-4IN-SS", size: '4"', color: "Silver", price: 320, stock: 1000 },
          { sku: "HNG-6IN-SS", size: '6"', color: "Silver", price: 480, stock: 600 },
        ],
      },
    },
  });

  // ---- Services (with per-service form field definitions) ----
  await prisma.service.create({
    data: {
      name: "Clearing & Forwarding",
      slug: "clearing-and-forwarding",
      tagline: "Customs clearance and freight forwarding, port to door.",
      description:
        "End-to-end customs clearance and freight forwarding for sea, air, and land cargo. We handle documentation, duties, and last-mile delivery so your shipments move without delay.",
      image: IMAGES.clearing,
      sortOrder: 1,
      fields: JSON.stringify([
        {
          name: "shipmentType",
          label: "Shipment type",
          type: "select",
          options: ["Sea", "Air", "Land"],
          required: true,
        },
        { name: "originCountry", label: "Origin country", type: "text", required: true },
        {
          name: "destinationCountry",
          label: "Destination country",
          type: "text",
          required: true,
        },
        {
          name: "cargoDescription",
          label: "Cargo description",
          type: "textarea",
          required: true,
        },
        {
          name: "weightVolume",
          label: "Estimated weight / volume",
          type: "text",
          required: false,
        },
        { name: "expectedDate", label: "Expected ship date", type: "date", required: false },
      ]),
    },
  });

  await prisma.service.create({
    data: {
      name: "Real Estate",
      slug: "real-estate",
      tagline: "Buy, sell, and lease commercial and residential property.",
      description:
        "Advisory and brokerage for residential, commercial, and land transactions. We represent buyers, sellers, and investors with on-the-ground market knowledge.",
      image: IMAGES.realEstate,
      sortOrder: 2,
      fields: JSON.stringify([
        {
          name: "interest",
          label: "I want to",
          type: "select",
          options: ["Buy", "Sell", "Rent"],
          required: true,
        },
        {
          name: "propertyType",
          label: "Property type",
          type: "select",
          options: ["Residential", "Commercial", "Land"],
          required: true,
        },
        { name: "location", label: "Preferred location / city", type: "text", required: true },
        { name: "budget", label: "Budget range", type: "text", required: false },
        { name: "timeline", label: "Timeline", type: "text", required: false },
      ]),
    },
  });

  await prisma.service.create({
    data: {
      name: "Import / Export Trading",
      slug: "import-export-trading",
      tagline: "Sourcing and trading across global markets.",
      description:
        "We connect buyers and suppliers across borders, managing sourcing, negotiation, and trade logistics for a wide range of commodities.",
      image: IMAGES.trading,
      sortOrder: 3,
      fields: JSON.stringify([
        {
          name: "direction",
          label: "Trade direction",
          type: "select",
          options: ["Import", "Export"],
          required: true,
        },
        { name: "commodity", label: "Product / commodity", type: "text", required: true },
        { name: "quantity", label: "Quantity required", type: "text", required: true },
        { name: "targetMarkets", label: "Target markets", type: "text", required: false },
        { name: "hsCode", label: "HS code (if known)", type: "text", required: false },
      ]),
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

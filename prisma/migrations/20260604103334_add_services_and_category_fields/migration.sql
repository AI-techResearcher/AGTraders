-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "minOrderQty" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "unit" TEXT;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "fields" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceInquiry" (
    "id" TEXT NOT NULL,
    "refNumber" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "details" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_slug_idx" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_active_idx" ON "Service"("active");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceInquiry_refNumber_key" ON "ServiceInquiry"("refNumber");

-- CreateIndex
CREATE INDEX "ServiceInquiry_serviceId_idx" ON "ServiceInquiry"("serviceId");

-- CreateIndex
CREATE INDEX "ServiceInquiry_status_idx" ON "ServiceInquiry"("status");

-- CreateIndex
CREATE INDEX "ServiceInquiry_createdAt_idx" ON "ServiceInquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "ServiceInquiry" ADD CONSTRAINT "ServiceInquiry_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

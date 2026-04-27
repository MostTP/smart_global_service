-- CreateTable
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceSlug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "customerName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "adminNotes" TEXT,
    "quoteAmount" INTEGER,
    "quoteCurrency" TEXT DEFAULT 'NGN',
    "quoteMessage" TEXT,
    "paymentProvider" TEXT,
    "paymentStatus" TEXT,
    "paymentRef" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "service_requests_serviceSlug_idx" ON "service_requests"("serviceSlug");

-- CreateIndex
CREATE INDEX "service_requests_category_idx" ON "service_requests"("category");

-- CreateIndex
CREATE INDEX "service_requests_status_idx" ON "service_requests"("status");

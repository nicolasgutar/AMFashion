-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "participatingModels" TEXT[],
    "productsShowcase" TEXT[],

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

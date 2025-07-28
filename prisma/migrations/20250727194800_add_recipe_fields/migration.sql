-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookTime" INTEGER,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "prepTime" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "servings" INTEGER;

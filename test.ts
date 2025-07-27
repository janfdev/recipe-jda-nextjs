import { PrismaClient } from "./lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.findMany();
  console.log(category);
}

main();

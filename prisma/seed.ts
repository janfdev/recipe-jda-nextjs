import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash("admin123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin Kece",
      email: "admin@gmail.com",
      password: passwordHash,
      role: "ADMIN"
    }
  });

  console.log("Admin user seeded!");
}

main()
  .catch((e) => {
    console.error("Seed failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import argon2 from "argon2";
import prisma from "../src/lib/prisma.js";

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD manquant dans .env");

  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  });

  await prisma.admin.upsert({
    where: { login: "admin" },
    update: { password: hash },
    create: { login: "admin", password: hash },
  });

  console.log("Admin créé/mis à jour.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

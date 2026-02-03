// lib/prisma.ts
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Crear adapter con la DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "",
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // ← OBLIGATORIO en Prisma 7+
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

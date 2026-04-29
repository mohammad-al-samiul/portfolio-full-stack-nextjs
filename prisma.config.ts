import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
    // Note: directUrl is not currently in the defineConfig type, 
    // but Prisma will use DIRECT_URL from env if specified in schema
  },
});

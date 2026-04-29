const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const { hash } = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seeding...");

  // 1. Create Admin User
  const hashedPassword = await hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@portfolio.com" },
    update: {},
    create: {
      email: "admin@portfolio.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created/updated.");

  // 2. Seed Blog Posts
  const dummyPosts = [
    {
      title: "The Future of Web Development with Next.js 16",
      slug: "future-of-web-dev-nextjs-16",
      excerpt: "Exploring the groundbreaking features of Next.js 16 and how it redefines the developer experience.",
      content: "## Introduction\n\nNext.js 16 is finally here, bringing Edge-first architecture to the mainstream...",
      category: "Frontend",
      tags: ["Next.js", "React", "WebDev"],
      published: true,
      coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Mastering Prisma 7 with PostgreSQL",
      slug: "mastering-prisma-7-postgresql",
      excerpt: "A comprehensive guide to the new Driver Adapter system in Prisma 7.",
      content: "## The Shift to Driver Adapters...\n\nPrisma 7 has introduced a revolutionary way to handle database connections...",
      category: "Backend",
      tags: ["Prisma", "PostgreSQL", "Database"],
      published: true,
      coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2042&auto=format&fit=crop",
    },
  ];

  for (const postData of dummyPosts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    });
  }
  console.log("Dummy posts created successfully.");

  // 3. Seed Projects
  const dummyProjects = [
    {
      title: "E-commerce Platform",
      slug: "ecommerce-platform-nextjs",
      description: "A high-performance online store with real-time inventory and secure payments.",
      content: "## Project Overview\n\nThis platform was built to handle thousands of concurrent users with sub-second page loads. It features a custom CMS for product management and integrated Stripe payments.\n\n### Key Features\n- Real-time stock tracking\n- AI-powered product recommendations\n- Multi-currency support",
      techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      coverImage: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089&auto=format&fit=crop",
      liveUrl: "https://example-shop.com",
      githubUrl: "https://github.com/example/shop",
      published: true,
      featured: true,
    },
    {
      title: "TaskFlow SaaS",
      slug: "taskflow-saas-management",
      description: "Enterprise-grade task management system with team collaboration tools.",
      content: "## Project Overview\n\nTaskFlow is a SaaS application designed for remote teams to manage complex workflows. It includes kanban boards, time tracking, and detailed productivity analytics.\n\n### Tech Highlights\n- Real-time updates with WebSockets\n- Role-based access control (RBAC)\n- Drag-and-drop workflow builder",
      techStack: ["React", "NestJS", "PostgreSQL", "Redis", "Framer Motion"],
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
      liveUrl: "https://taskflow-demo.com",
      githubUrl: "https://github.com/example/taskflow",
      published: true,
    },
    {
      title: "SwiftRide Booking",
      slug: "swiftride-bike-rental",
      description: "A specialized bike rental and booking system for urban commuters.",
      content: "## Project Overview\n\nSwiftRide simplifies the bike rental process with a mobile-first booking experience. It includes GPS tracking for bikes and an automated billing system.\n\n### Features\n- Interactive map for bike locations\n- QR code unlocking system\n- Dynamic pricing based on demand",
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Google Maps API", "Express"],
      coverImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop",
      liveUrl: "https://swiftride.com",
      githubUrl: "https://github.com/example/swiftride",
      published: true,
    },
  ];

  for (const projectData of dummyProjects) {
    await prisma.project.upsert({
      where: { slug: projectData.slug },
      update: {},
      create: projectData,
    });
  }
  console.log("Dummy projects created successfully.");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

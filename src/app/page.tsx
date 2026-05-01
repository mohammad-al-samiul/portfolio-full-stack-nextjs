import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { Contact } from "@/components/sections/Contact";
import { Post } from "@/lib/types";

export default async function Home() {
  // Fetch latest 3 published blog posts
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Home page: Failed to fetch blog posts", error);
  }

  return (
    <div className="flex flex-col w-full">
      <Hero />

      <About />

      <Skills />

      <Experience />

      <Projects />

      {/* Shared Data Source: Fetching directly from Prisma */}
      <LatestBlog posts={posts} />
      <Contact />
    </div>
  );
}

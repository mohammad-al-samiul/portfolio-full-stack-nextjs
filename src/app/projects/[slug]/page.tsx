import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const dbProject = await prisma.project.findUnique({
    where: { slug },
  });

  if (!dbProject) {
    notFound();
  }

  // Map database project to the format expected by ProjectDetail component
  const project = {
    id: dbProject.id,
    slug: dbProject.slug,
    title: dbProject.title,
    shortDescription: dbProject.description,
    fullDescription: dbProject.content || "",
    image: dbProject.coverImage || "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    techStack: dbProject.techStack || [],
    liveLink: dbProject.liveUrl || undefined,
    githubLink: dbProject.githubUrl || undefined,
    challenges: [],
    futureImprovements: [],
    featured: dbProject.featured,
    category: "Fullstack" as const, // Fallback since DB does not store category
  };

  return <ProjectDetail project={project} />;
}

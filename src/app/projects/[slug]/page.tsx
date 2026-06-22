import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiul.vercel.app";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbProject = await prisma.project.findUnique({
    where: { slug },
  });

  if (!dbProject) return {};

  return {
    title: `${dbProject.title} | Portfolio | Mohammad Al Samiul`,
    description: dbProject.description || `A project by Mohammad Al Samiul showcasing ${dbProject.title}`,
    keywords: [
      "Portfolio",
      "Project",
      "Software Engineering",
      ...dbProject.techStack,
      dbProject.title,
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${siteUrl}/projects/${slug}`,
      title: dbProject.title,
      description: dbProject.description || "",
      images: dbProject.coverImage
        ? [
            {
              url: dbProject.coverImage,
              width: 1200,
              height: 630,
              alt: dbProject.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: dbProject.title,
      description: dbProject.description || "",
      images: dbProject.coverImage ? [dbProject.coverImage] : [],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
  };
}

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
    category: "Fullstack" as const,
  };

  // JSON-LD Structured Data for SoftwareSourceCode
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: dbProject.title,
    description: dbProject.description || "",
    creator: {
      "@type": "Person",
      name: "Mohammad Al Samiul",
      url: siteUrl,
    },
    codeRepository: dbProject.githubUrl || undefined,
    url: `${siteUrl}/projects/${slug}`,
    programmingLanguage: dbProject.techStack || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}

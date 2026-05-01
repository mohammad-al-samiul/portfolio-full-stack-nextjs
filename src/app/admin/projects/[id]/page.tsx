import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectFormSkeleton } from "@/components/admin/ProjectFormSkeleton";
import { Suspense } from "react";

interface ProjectEditorPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectEditorPage({ params }: ProjectEditorPageProps) {
  const session = await auth();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;

  if (id === "new") {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProjectForm />
      </div>
    );
  }

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProjectFormSkeleton />}>
        <ProjectForm initialData={project} />
      </Suspense>
    </div>
  );
}

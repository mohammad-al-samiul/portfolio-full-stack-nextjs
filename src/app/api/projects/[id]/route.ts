import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  techStack: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    const json = await req.json();
    const body = projectSchema.parse(json);

    const project = await prisma.project.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_PATCH]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.issues },
        { status: 422 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PROJECTS_DELETE]", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete project";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().min(1),
  content: z.string().optional(),
  techStack: z.array(z.string()),
  coverImage: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();

    // Apply fallbacks before validation
    const dataToValidate = {
      ...json,
      slug: json.slug || generateSlug(json.title || ""),
      content: json.content || "",
    };

    const body = projectSchema.parse(dataToValidate);

    const project = await prisma.project.create({
      data: {
        ...body,
        slug: body.slug || generateSlug(body.title),
        content: body.content || "",
      },
    });

    revalidatePath("/");
    revalidatePath(`/projects/${project.slug}`);

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECTS_POST]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Validation Error", errors: error.issues }),
        { status: 422 },
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const adminList = new URL(req.url).searchParams.get("admin") === "1";

    if (adminList && !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: adminList && session ? {} : { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        techStack: true,
        coverImage: true,
        liveUrl: true,
        githubUrl: true,
        featured: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch projects";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

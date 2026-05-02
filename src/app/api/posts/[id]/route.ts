import { NextResponse } from "next/server";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { runNewPostEmailJob } from "@/lib/email/new-post-notification";

const postSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
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
    const body = postSchema.parse(json);

    const previous = await prisma.post.findUnique({ where: { id } });
    if (!previous) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: body,
    });

    const becamePublished = post.published && !previous.published;
    if (becamePublished) {
      after(() => {
        void runNewPostEmailJob({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
        });
      });
    }

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POSTS_PATCH]", error);
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

    // Get post slug before deleting for revalidation
    const post = await prisma.post.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/blog");
    if (post) {
      revalidatePath(`/blog/${post.slug}`);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[POSTS_DELETE]", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete post";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("[POSTS_GET]", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

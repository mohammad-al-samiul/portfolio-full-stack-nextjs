import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // Attempting to access the newsletter model
    // If you see a red line here, please run 'npx prisma generate' and restart your TS Server.
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 },
      );
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully!",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[SUBSCRIBE_API] Error:", error);
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

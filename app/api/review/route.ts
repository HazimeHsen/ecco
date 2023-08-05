import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { rating, userId, productId } = body;
  if (rating === undefined || rating === null || rating < 0) {
    return;
  }
  const review = await prisma.reviews.create({
    data: {
      rating,
      userId,
      productId,
    },
  });

  return NextResponse.json(review);
}

export async function GET(req: Request) {
  const review = await prisma.reviews.findMany();

  return NextResponse.json(review);
}

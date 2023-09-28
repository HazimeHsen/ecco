import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { id } = params;
  const review = await prisma.reviews.findMany({
    where: {
      productId: id,
    },
  });

  return NextResponse.json(review);
}

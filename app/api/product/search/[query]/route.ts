import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  query?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { query } = params;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          mode: "insensitive",
          contains: query,
        },
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error("Error querying products:", error);
    return NextResponse.json({
      message: "An error occurred while fetching products.",
    });
  }
}

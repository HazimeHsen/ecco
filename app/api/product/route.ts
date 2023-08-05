import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    discount,
    brand,
    category,
    price,
    countInStock,
    images,
    description,
  } = body;

  const product = await prisma.product.create({
    data: {
      name,
      discount,
      brand,
      category,
      price,
      countInStock,
      images,
      description,
    },
  });

  return NextResponse.json(product);
}

export async function GET(req: Request) {
  const product = await prisma.product.findMany();
  return NextResponse.json(product);
}

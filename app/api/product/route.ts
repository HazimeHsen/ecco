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

  return NextResponse.json({
    message: `Product ${product?.name} Created successfully`,
  });
}

export async function GET(req: Request) {
  const product = await prisma.product.findMany();
  return NextResponse.json(product);
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = req.url.split("=")[1];

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({
        error: "Product not found",
      });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      message: `Product ${product.name} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while deleting the product",
    });
  }
}

export async function PUT(req: Request) {
  try {
    const productId = req.url?.split("=")[1];
    console.log(productId);
    if (!productId) {
      throw new Error("Invalid request URL");
    }

    const body = await req.json();
    const { name, category, price, countInStock, images } = body;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name,
        category: category,
        price: price,
        countInStock: countInStock,
        images: images,
      },
    });

    return NextResponse.json({
      message: `Product ${product?.name} Updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(); 
  }
}

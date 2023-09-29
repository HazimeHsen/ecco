import prisma from "@/app/libs/prismadb";
import { Order, OrderItem, Product } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const {
    userId,
    totalCost,
    quantity,
    country,
    city,
    postalCode,
    state,
    orderItems,
    streetAddress,
    paymentMethod,
  } = body;

  const order = await prisma.order.create({
    data: {
      userId,
      totalCost,
      quantity,
      country,
      city,
      postalCode,
      state,
      streetAddress,
      paymentMethod,
      orderItems: {
        create: orderItems.map((product: Product) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
          quantity: product.quantity,
        })),
      },
    },
  });
  console.log(order);

  return NextResponse.json(order);
}
export async function GET(req: Request) {
  const order = await prisma.order.findMany();
  return NextResponse.json(order);
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = req.url.split("=")[1];

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      return NextResponse.json({
        error: "Product not found",
      });
    }
    const deleteOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: orderId,
      },
    });

    const deleteOrderItems = await prisma.orderItem.deleteMany({
      where: {
        orderId: orderId,
      },
    });

    const orderIds = orderItems.map((order) => order.orderId);

    return NextResponse.json({
      message: `Order deleted successfully`,
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
    const orderId = req.url?.split("=")[1];
    if (!orderId) {
      throw new Error("Invalid request URL");
    }

    const body = await req.json();
    const { paid, delivered } = body;
    console.log(body);
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: paid,
        isDelivered: delivered,
      },
    });
    const theOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    console.log(theOrder);

    return NextResponse.json({
      message: `Order Updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

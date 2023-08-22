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

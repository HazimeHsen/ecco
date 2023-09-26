import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
  const user = await prisma.user.findMany();
  return NextResponse.json(user);
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = req.url.split("=")[1];

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });

  const orderIds = orders.map((order) => order.id);

  const deletedOrderItems = await prisma.orderItem.deleteMany({
    where: {
      orderId: {
        in: orderIds,
      },
    },
  });

  const deletedOrders = await prisma.order.deleteMany({
    where: {
      userId: userId,
    },
  });

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return NextResponse.json({
    message: `User ${user?.name} deleted successfully`,
  });
}

export async function PUT(req: Request) {
  const userId = req.url.split("=")[1];
  const body = await req.json();
  const { name, email, image, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
      image: image,
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json({
    message: `User ${user?.name} Updated successfully`,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, image } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      image,
    },
  });

  return NextResponse.json({
    data: user,
    message: `User ${user.name} created successfully`,
  });
}

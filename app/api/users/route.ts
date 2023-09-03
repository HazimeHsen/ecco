import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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

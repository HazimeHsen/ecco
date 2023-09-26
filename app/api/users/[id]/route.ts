import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";
import { OrderItem, Product } from "@prisma/client";

interface IParams {
  id?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });

  const orderItems: OrderItem[] = [];

  await Promise.all(
    orders.map(async (order) => {
      const orderItem = await prisma.orderItem.findFirst({
        where: {
          orderId: order.id,
        },
      });

      if (orderItem) {
        orderItems.push(orderItem);
      }
    })
  );
  const products: Product[] = [];

  await Promise.all(
    orderItems.map(async (orderItem) => {
      const product = await prisma.product.findFirst({
        where: {
          id: orderItem.productId,
        },
      });

      if (product) {
        products.push(product);
      }
    })
  );

  console.log("orderItems", products);

  const reviews = await prisma.reviews.findMany({
    where: {
      userId: id,
    },
  });

  return NextResponse.json({
    user: {
      name: user?.name,
      email: user?.email,
      createdAt: user?.createdAt,
      image: user?.image,
    },
    orders,
    orderItems,
    products,
    reviews,
  });
}

// export async function DELETE(req: Request, { params }: { params: IParams }) {
//   const { userId } = params;

//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   });

//   const orders = await prisma.order.findMany({
//     where: {
//       userId: userId,
//     },
//   });

//   const orderIds = orders.map((order) => order.id);

//   const deletedOrderItems = await prisma.orderItem.deleteMany({
//     where: {
//       orderId: {
//         in: orderIds,
//       },
//     },
//   });

//   const deletedOrders = await prisma.order.deleteMany({
//     where: {
//       userId: userId,
//     },
//   });

//   const deletedUser = await prisma.user.delete({
//     where: {
//       id: userId,
//     },
//   });
//   return NextResponse.json({
//     message: `User ${user?.name} deleted successfully`,
//   });
// }

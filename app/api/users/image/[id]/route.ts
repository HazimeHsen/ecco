import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
interface IParams {
  id?: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  const userId = params.id;
  const body = await req.json();
  const { image } = body;

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: image,
    },
  });

  return NextResponse.json({
    message: `User ${user?.name} Updated successfully`,
  });
}

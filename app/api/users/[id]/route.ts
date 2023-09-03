import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  console.log("id", id);
  return NextResponse.json(id, { status: 200 });
}

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    const check = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!check) {
      return NextResponse.json({
        statusCode: 404,
        message: "Unable to delete or not found",
        status: false,
      });
    }
    const response = await prisma.user.delete({
      where: {
        id,
      },
    });

    console.log(response);
    if (!response) {
      return NextResponse.json({
        statusCode: 404,
        message: "Unable to delete or not found",
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "Deleted Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
}

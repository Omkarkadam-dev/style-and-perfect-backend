import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName } = body;

    if (!fullName) {
      return NextResponse.json({
        statusCode: 404,
        message: "Fullname is sent empty",
        status: false,
      });
    }

    const response = await prisma.appointment.findMany({
      where: {
        fullName: {
          contains: fullName, // The name entered by the user
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    if (!response) {
      return NextResponse.json({
        statusCode: 200,
        message: "No any customer exits",
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "fetch successfully",
      response,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to perform the search",
      status: false,
    });
  }
}

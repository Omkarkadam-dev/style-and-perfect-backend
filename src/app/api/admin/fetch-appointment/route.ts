import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const response = await prisma.appointment.findMany({});

    if (!response) {
      return NextResponse.json({
        statusCode: 200,
        message: "No any active appointment",
        response: [],
        status: true,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "Appointment fetch successfully",
      response,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to fetch the appointment",
      status: false,
    });
  }
}

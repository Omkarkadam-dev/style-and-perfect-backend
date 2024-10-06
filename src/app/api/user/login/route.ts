import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;

    console.log(email, password)
    if (!email || !password) {
      return NextResponse.json({
        statusCode: 404,
        message: "Anyone field is empty",
        status: false,
      });
    }

    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return NextResponse.json({
        statusCode: 400,
        message: "User does not exit",
        status: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return NextResponse.json({
        statusCode: 400,
        message: "invalid credentials",
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "User regisered Successfully",
      response: checkUser,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to login the user",
      status: false,
    });
  }
}

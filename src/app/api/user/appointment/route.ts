import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { appointmentMail } from "../../../../../utils/AppointmentMail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, phoneNumber, category, date, message } = body;

    if (!fullName || !email || !phoneNumber || !category || !date || !message) {
      return NextResponse.json({
        statusCode: 404,
        messag: "Anyone field is empty",
        status: false,
      });
    }

    const response = await prisma.appointment.create({
      data: {
        fullName,
        email,
        phoneNumber,
        category,
        date,
        message,
      },
    });

    const appointmentEmail = await appointmentMail(email, fullName, date);

    if (!appointmentEmail) {
      return NextResponse.json({
        statusCode: 400,
        message:
          "Appointment registered but unable to send the confirmation email",
        response,
        status: true,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "Appointment successfully registered",
      response,
      status: true,
    });


  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to register for appointment",
      status: false,
    });
  }
}

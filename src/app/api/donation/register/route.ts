import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { donationMail } from "../../../../../utils/DonationMail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phoneNumber,
      address,
      typeOfDonation,
      additionalInformation,
    } = body;

    if (!fullName || !email || !phoneNumber || !address || !typeOfDonation) {
      return NextResponse.json({
        statusCode: 404,
        message: "Anyone field it empty",
        status: false,
      });
    }

    const response = await prisma.donation.create({
      data: {
        fullName,
        email,
        phoneNumber,
        address,
        typeOfDonation,
        additionalInformation,
      },
    });

    const sendMail = await donationMail(email, fullName);

    if (!sendMail) {
      return NextResponse.json({
        statusCode: 404,
        message: "user resitered but unable to send the mail",
        response,
        status: false,
      });
    }

    return NextResponse.json({
      statusCode: 200,
      message: "User registered Successfull and email send successfully",
      response,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to register for donation, please try again later",
      status: false,
    });
  }
}

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {id, otp} = body;

        const response = await prisma.user.findUnique({
            where: {
                id, 
                otp
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 404, message: 'Invalid otp', status: false})
        }

        return NextResponse.json({statusCode: 200, message: 'verified successfully', response, status: true})

    } catch (error) {
        return NextResponse.json({statusCode: 500, message: 'unable to verify the otp', status: false})
    }
}



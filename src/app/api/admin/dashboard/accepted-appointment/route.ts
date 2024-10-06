import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        
        const response = await prisma.appointment.findMany({
            where: {
                status: "ACCEPTED"
            }
        });
        if(!response) {
            return NextResponse.json({statusCode: 200, total: 0, status: true})
        }

        return NextResponse.json({statusCode: 200, total: response.length, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch appointment', status: false})
    }
}
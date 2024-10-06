import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        
        const response = await prisma.appointment.findMany({});

        const total = response.length;

        return NextResponse.json({statusCode: 200, total: total, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch appointment', status: false})
    }
}
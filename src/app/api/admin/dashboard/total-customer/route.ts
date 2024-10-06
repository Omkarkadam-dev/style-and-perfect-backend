import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const response = await prisma.user.findMany({})

        const totalCustomer = response.length;

        return NextResponse.json({statusCode: 200, total: totalCustomer, status: true})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'unable to compute the total customer number', status: false})
    }
}
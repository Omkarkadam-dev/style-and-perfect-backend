import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const response = await prisma.user.findMany({})

        if(!response) {
            return NextResponse.json({statusCode: 200, message: 'Any one registered customer is found', response, status: true})
        }

        return NextResponse.json({statusCode: 200, message: 'customer list fetched succesfully', response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to find the customer list', status: false})
    }
}
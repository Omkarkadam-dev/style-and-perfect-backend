import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {email, password} = body;

        if(!email || !password) {
            return NextResponse.json({statusCode: 500, message: 'Anyone field is empty', status: false})
        }

        const response = await prisma.admin.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        console.log(response)

        if(!response) {
            return NextResponse.json({statusCode: 500, message: 'admin is not registered', status: false})
        }

        return NextResponse.json({statusCode: 200, response, message: 'Sucessfully logged in', status: true})

    } catch (error) {
        return NextResponse.json({statusCode: 500, message: 'Unable to resolve the request', status: false})
    }
}
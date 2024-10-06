import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nodeMailer } from "../../../../../utils/NodeMailer";
import { passwordHashing } from "../../../../../utils/HashPassword";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {firstName, surname, email, password} = body;

        if(!firstName || !surname || !email || !password) {
            return NextResponse.json({statusCode: 404, message: 'Anyone field is empty', status: false});
        }

        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(checkUser) {
            return NextResponse.json({statusCode: 400, message: 'User already exists', status: false})
        }

        // const otp = await nodeMailer(email);

        const otp = "1234"

        if(!otp) {
            return NextResponse.json({statusCode: 500, message: 'Sorry, unable to generate the Otp(internal server Error)', status: false});
        }

        
        const response = await prisma.user.create({
            data: {
                firstName,
                surname,
                email,
                password: await passwordHashing(password),
                otp
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 500, message: 'Unable to crate the user(internal server error)', status: false})
        }

        return NextResponse.json({statusCode: 200, response, message: 'User created successfully', status: true})

    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to register the user', status: false});
    }
}

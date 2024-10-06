import { NextRequest, NextResponse } from "next/server";
import { subscriptionMail } from "../../../../../utils/SubscribeMail";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {email} = body

        const mail = await subscriptionMail(email)

        if(!mail) {
            return NextResponse.json({statusCode: 404, message: 'Something we wrong in sending the mail', status: false})
        }

        return NextResponse.json({statusCode: 200, message: "Mail successfully sent", status: true})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to send the subcription mail', status: false})
    }
}


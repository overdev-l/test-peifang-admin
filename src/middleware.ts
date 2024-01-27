import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";
export async function middleware(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    const result =  await verifyAuth(request)
    if (!result) {
        return response
    } else  {
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|sign-in|sign-up|gdn|favicon.ico|robots.txt|images|$).*)',
    ],
}
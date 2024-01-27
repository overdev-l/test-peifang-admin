import { getCompanyAccessToken } from "@/actions/cache"
import { setUserCookie } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { companyUserIdHandler } from "@/actions/companyCommon"
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const accessToken = await getCompanyAccessToken()
    const { userid } = await companyUserIdHandler(accessToken, code as string)
    const result = await prisma.admin_users.findFirst({
        where: {
            company_id: userid
        }
    })
    const redirect_uri = result ? "https://test-admin.peifang.app/dashboard" : `https://test-admin.peifang.app/sign-up/${userid}`
    const response = NextResponse.redirect(redirect_uri, { status: 302 });
    if (result) {
        setUserCookie(response, {
            nickname: result?.nickname,
            email: result?.email,
            id: typeof result?.id === 'bigint'
                ? result?.id.toString()
                : result?.id,
            avatar: result?.avatar,
            role: result?.role,
        })
    }
    return response

}
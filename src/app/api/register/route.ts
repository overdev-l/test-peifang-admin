import { getCompanyAccessToken } from "@/actions/cache"
import { setUserCookie } from "@/lib/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { companyUserIdHandler } from "@/actions/companyCommon"
import { z } from "zod"
import { formSchema } from "@/schemas/register"
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const data = searchParams.get('data')
    let redirect_uri
    if (data) {
        redirect_uri = "https://test-admin.peifang.app/dashboard"
        const response = NextResponse.redirect(redirect_uri, { status: 302 });
        const result = JSON.parse(data) as z.infer<typeof formSchema>
        const info = {
            company_id: result.company_id,
            nickname: result.nickname,
            avatar: result.avatar,
            email: result.email,
            role: 2,
            modifier_id: 0,
            modifier_avatar: result.avatar,
            modify_time: new Date(),
            modifier_nickname: result.nickname
        }
        const res = await prisma.admin_users.create({
            data: info
        })
        setUserCookie(response, {
            nickname: res?.nickname,
            email: res?.email,
            id: typeof res?.id === 'bigint'
                ? res?.id.toString()
                : res?.id,
            avatar: res?.avatar,
            role: res?.role,
        })
        return response
    } else {
        redirect_uri = `https://test-admin.peifang.app/sign-in`
        const response = NextResponse.redirect(redirect_uri, { status: 302 });
        return response
    }



}
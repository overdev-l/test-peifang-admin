"use server"
import { cookies } from "next/headers"
import { getAuthCache, setAuthCache } from "./cache"
import { prisma } from "@/lib/prisma"
import { SignJWT } from "jose"
import z from "zod"
import { formSchema } from "@/schemas/register"
import { NextResponse } from "next/server"
import { setUserCookie } from "@/lib/auth"

export const getCompanyPath = async () => {
    const id = await setAuthCache()
    const redirectUrl = `https://test-admin.peifang.app/auth?id=${id}`
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.NEXT_PUBLIC_COMPANY_WECHAT_CORP_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=${process.env.NEXT_PUBLIC_COMPANY_WECHAT_APP_ID}#wechat_redirect`
    return {
        id,
        url
    }
}

export const queryAuthStatus = async (id: string) => {
    const { status, data } = await getAuthCache(id)
    if (data) {
        const email = data.email
        const result = await prisma.admin_users.findFirst({
            where: {
                email: email
            }
        })
        const token = await new SignJWT(result!)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET))
        const cookie = cookies()
        cookie.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60,
        })
    }

    return status
}


export const registerAdminUser = async (data: z.infer<typeof formSchema>) => {
    const info = {
        company_id: data.company_id,
        nickname: data.nickname,
        avatar: data.avatar,
        email: data.email,
        role: 2,
        modifier_id: 0,
        modifier_avatar: data.avatar,
        modify_time: new Date(),
        modifier_nickname: data.nickname
    }
    await prisma.admin_users.create({
        data: info
    })
    const token = await new SignJWT(info)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET))
    return token
}
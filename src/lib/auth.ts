import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
export class AuthError extends Error {}
export async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get("token")?.value
  
    if (!token) return false
  
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET)
      )
      return verified.payload
    } catch (err) {
      return false
    }
  }

  export async function setUserCookie(res: NextResponse, info: any) {
    const token = await new SignJWT(info)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET))
  
    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hours in seconds
    })
  
    return res
  }

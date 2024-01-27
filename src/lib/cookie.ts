import { jwtVerify } from "jose"
import { cookies } from "next/headers"

export const payloadHandler = async () => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const { payload } = await jwtVerify(
        token?.value || "",
        new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET)
    )
    return payload
}
"use server"
import { companyAccesTokenHandler } from "./companyCommon"
import RedisClient from "./redis"
import { nanoid } from 'nanoid'

export async function getCompanyAccessToken() {
   const token =  await RedisClient.get("company_access_token")
   if (!token) {
    const { access_token, expires_in } = await companyAccesTokenHandler(process.env.COMPANY_WECHAT_APP_SECRET as string)
    await RedisClient.set("company_access_token", access_token, "EX", expires_in)
    return access_token
   }
   return token
}

export async function setAuthCache() {
   const id = nanoid()
   const json = {
      id,
      data: {
         statsu: 1, //1 未扫码  2成功 3已过期 
      }
   }
   await RedisClient.set(id, JSON.stringify(json), "EX", 60 * 5)
   return id
}

export async function getAuthCache(id: string): Promise<{status: 1| 2| 3, data?: any}> {
   const result = await RedisClient.get(id)
   if (!result) return {
      status: 3
   }
   const res = JSON.parse(result)?.data
   if (res) {
      return {
         status: 2,
         data: res
      }
   } else {
      return {
         status: 2,
      }
   }
}
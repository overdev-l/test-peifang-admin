import 'server-only';
export async function companyAccesTokenHandler(secret: string) {
    const response =  await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${process.env.NEXT_PUBLIC_COMPANY_WECHAT_CORP_ID}&corpsecret=${secret}`)
    const { access_token, expires_in } = await response.json()
    return {
        access_token,
        expires_in
    }
}

export async function companyUserIdHandler(access_token: string, code: string) {
    const response = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo?access_token=${access_token}&code=${code}`)
    const result = await response.json()
    return result as { userid: string }
}

export async function companyUserDetailHandler(access_token: string, userid: string) {
    const response = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&userid=${userid}`)
    const result = await response.json()
    console.log(result)
    return result
}
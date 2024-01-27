import * as ww from '@wecom/jssdk'
import {QRCodeSVG} from 'qrcode.react';
export function createWWLoginPanel(el: string) {
    console.log(process.env.NEXT_PUBLIC_COMPANY_WECHAT_APP_ID)
    return ww.createWWLoginPanel({
        el,
        params: {
            login_type: ww.WWLoginType.corpApp,
            appid: process.env.NEXT_PUBLIC_COMPANY_WECHAT_CORP_ID as string,
            agentid: process.env.NEXT_PUBLIC_COMPANY_WECHAT_APP_ID as string,
            redirect_uri: "http://www.asynctodo.com/api/auth",
            panel_size: ww.WWLoginPanelSizeType.small
        },
    })
}
export function AccessCode ({ value }: {value: string}) {
    return (
        <QRCodeSVG
         value={value}
         size={256}
        />
    )
}



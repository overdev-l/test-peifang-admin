"use client"

import { createWWLoginPanel } from "@/lib/compnyWechat"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { getCompanyPath } from "@/actions/auth"


export default function Page() {
    useEffect(() => {
        const instance = createWWLoginPanel("#target")
        return () => {
            instance.unmount()
        }
    }, [])
    return (
        <main className="w-full h-full flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Hi！</CardTitle>
                    <CardDescription>您的每一次登录都是我们团队成功路上的重要一步。愿您今天工作顺利！</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <div id="target"></div>
                </CardContent>
            </Card>
        </main>

    )
}

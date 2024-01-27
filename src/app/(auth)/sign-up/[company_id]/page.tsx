"use client"
import { useForm } from "react-hook-form"
import z from 'zod'
import { formSchema } from '@/schemas/register'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Uploader from "@/components/uploaderHookForm"
import { Card, CardContent } from "@/components/ui/card"
import { registerAdminUser } from "@/actions/auth"
import { redirect } from "next/navigation"
export default function Page({ params }: { params: { company_id: string } }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: '',
            avatar: '',
            email: '',
            company_id: params.company_id
        }
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
       window.location.href = `${window.location.origin}/api/register?data=${JSON.stringify(data)}`
    }
    return (
        <main className="max-w-6xl mx-auto h-full flex justify-center items-center">
            <Card className="w-80">
                <CardContent className="p-6 flex justify-center items-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-32">
                            <FormField
                                control={form.control}
                                name="nickname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>昵称</FormLabel>
                                        <FormControl>
                                            <Input placeholder="请输入昵称" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>邮箱</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="请输入邮箱" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatar"
                                rules={{ required: '请上传头像' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>头像</FormLabel>
                                        <FormControl>
                                            <Uploader field={field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>公司ID</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="公司ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">提交</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}
"use server"
import { payloadHandler } from "@/lib/cookie";
import { prisma } from "@/lib/prisma";
import { z } from 'zod'
import { postSchema } from "@/schemas/resources";
import Dayjs from "dayjs";

export async function get(page: number, size: number, category: string) {
    const total = await prisma.resources.count({
        where: {
            is_deleted: 0
        }
    })
    const resources = await prisma.resources.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            category_id: category === '' ? undefined : BigInt(category),
            is_deleted: 0,
            OR: [
                {status: 2},
                {status: 3}
            ]
        }
    })
    return {
        list: resources.map(item => ({
            ...item,
            create_time: Dayjs(item.create_time).format("YYYY-MM-DD hh:mm"),
            modif_time: Dayjs(item.modif_time).format("YYYY-MM-DD hh:mm"),
        })),
        total
    }

}


export async function post(body: z.infer<typeof postSchema>) {
    const payload = await payloadHandler()
    const category = await prisma.category.findFirst({
        where: {
            id: BigInt(body.category)
        }
    })
    if (!category) {
        throw new Error("分类错误")
    }
    await prisma.resources.create({
        data: {
            name: body.name,
            title: body.title,
            description: body.description,
            url: body.url,
            cover: body.cover,
            widget: body.widget,
            create_time: new Date(),
            modif_time: new Date(),
            status: 0,
            founder: BigInt(payload.id as string),
            modifier: BigInt(payload.id as string),
            founder_avatar: payload.avatar as string,
            modifier_avatar: payload.avatar as string,
            founder_nickname: payload.nickname as string,
            modifier_nickname: payload.nickname as string,
            category_id: category.id,
            category_name: category.name,
            category_status: category.status
        }
    })

}

export async function put(body: z.infer<typeof postSchema> & {id: number, status: number}) {
    const category = await prisma.category.findFirst({
        where: {
            id: BigInt(body.category)
        }
    })
    if (!category) {
        throw new Error("分类错误")
    }
    await prisma.resources.update({
        data: {
            name: body.name,
            title: body.title,
            description: body.description,
            cover: body.cover,
            url: body.url,
            widget: body.widget,
            status: body.status,
            category_id: category.id,
            category_name: category.name,
            category_status: category.status
        },
        where: {
            id: body.id
        }
    })
}

export async function del(id: number) {
    await prisma.resources.update({
        where: {
            id
        },
        data: {
            is_deleted: 1
        }
    })
}
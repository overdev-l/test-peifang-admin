"use server"
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from 'next/headers'
import Dayjs from 'dayjs'
import { payloadHandler } from "@/lib/cookie";

export const categoryList = async (page: number, size: number, name: string, status?: number) => {
    const categories = await prisma.category.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            is_deleted: 0,
            name: name === "" ? undefined : name,
            status
        }
    });
    const categoriesWithCounts = await Promise.all(categories.map(async (category) => {
        const resourceCount = await prisma.resources.count({
            where: { category_id: category.id, is_deleted: 0 },
        });
        return {
            ...category,
            id: category.id.toString(),
            create_time: Dayjs(category.create_time.toDateString()).format("YYYY-MM-DD:HH:MM"),
            modify_time: Dayjs(category.modify_time.toDateString()).format("YYYY-MM-DD:HH:MM"),
            resourceCount,
        };
    }));
    const totalCategoryCount = await prisma.category.count({
        where: {
            is_deleted: 0,
            name,
            status
        }
    })
    return {
        totalCategoryCount,
        categoriesWithCounts
    }
}

export const post = async (
    name: string,
    widget: number,
    description: string
) => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const { payload } = await jwtVerify(
        token?.value || "",
        new TextEncoder().encode(process.env.JSON_WEBTOKEN_SECRET)
    )
    await prisma.category.create({
        data: {
            name,
            widget,
            founder: BigInt(payload.id as string),
            modifier: BigInt(payload.id as string),
            description,
            founder_avatar: payload.avatar as string,
            modifier_avatar: payload.avatar as string,
            founder_nickname: payload.nickname as string,
            modifier_nickname: payload.nickname as string,
        }
    })
}

export const put = async (
    name: string,
    status: number,
    widget: number,
    description: string,
    id: string
) => {
    const payload = await payloadHandler()
    await prisma.category.update({
        data: {
            name,
            status,
            widget,
            description,
            modifier_avatar: payload.avatar as string,
            modifier_nickname: payload.nickname as string,
            modify_time: new Date(),
            modifier: BigInt(payload.id as string)
        },
        where: {
            id: BigInt(id)
        }
    })
    await prisma.resources.updateMany({
        data: {
            category_status: status,
            modifier_avatar: payload.avatar as string,
            modifier_nickname: payload.nickname as string,
            modif_time: new Date(),
            modifier: BigInt(payload.id as string)
        },
        where: {
            category_id: BigInt(id)
        }
    })
}

export const del = async (id: string) => {
    await prisma.category.update({
        data: {
            is_deleted: 1
        },
        where: {
            id: BigInt(id)
        }
    })
}

export async function findAll() {
    return await prisma.category.findMany({
        where: {
            is_deleted: 0,
            status: 1
        }
    })
}
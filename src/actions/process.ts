"use server"
import { prisma } from "@/lib/prisma";
import Dayjs from "dayjs";

async function article(page: number, size: number) {
    const total = await prisma.articles.count({
        where: {
            is_deleted: 0,
            status: 1
        }
    })
    const list = await prisma.articles.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            is_deleted: 0,
            status: 1
        }
    })
    return {
        list: list.map(item => ({
            ...item,
            create_time: Dayjs(item.create_time).format("YYYY-MM-DD hh:mm"),
            modify_time: Dayjs(item.modify_time).format("YYYY-MM-DD hh:mm"),
        })),
        total
    }
}


async function resource(page: number, size: number) {
    const total = await prisma.resources.count({
        where: {
            is_deleted: 0,
            status: 1
        }
    })
    const list = await prisma.resources.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            is_deleted: 0,
            status: 1
        }
    })
    return {
        list: list.map(item => ({
            ...item,
            create_time: Dayjs(item.create_time).format("YYYY-MM-DD hh:mm"),
            modify_time: Dayjs(item.modif_time).format("YYYY-MM-DD hh:mm"),
        })),
        total
    }
}

export async function get(page: number, size: number, type: "article" | "resource") {

    if (type === "article") {
        return await article(page, size)
    } else {
        return await resource(page, size)
    }
}

export async function articleCheck(id: number, status: 2 | 3) {
    await prisma.articles.update({
        data: {
            status
        },
        where: {
            id,
        }
    })
}

export async function resourceCheck(id: number, status: 2 | 3) {
    await prisma.resources.update({
        data: {
            status
        },
        where: {
            id
        }
    })
}
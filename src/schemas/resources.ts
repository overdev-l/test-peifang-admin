import { z } from 'zod'

export const postSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    cover: z.string(),
    category: z.string(),
    widget: z.number()
})
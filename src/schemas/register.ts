import z from 'zod'
export const formSchema = z.object({
    nickname: z.string().min(2, "昵称最小2个字符").max(20, "昵称最大20个字符"),
    avatar: z.string().url("头像不能为空"),
    email: z.string().email("邮箱不能为空"),
    company_id: z.string()
  })
  
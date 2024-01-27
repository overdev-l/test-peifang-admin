import { Home, Tag, Package, ShieldPlus, BookMinus, Users } from "lucide-react";

export const Menus = [
    {
        label: '首页',
        icon: Home,
        path: '/dashboard'
    },
    {
        label: '资源类型',
        icon: Tag,
        path: '/dashboard/tag'
    },
    {
        label: '开发资源',
        icon: Package,
        path: '/dashboard/resources'
    },
    {
        label: '审核',
        icon: ShieldPlus,
        path: '/dashboard/process'
    },
    {
        label: '文章',
        icon: BookMinus,
        path: '/dashboard/article'
    },
    {
        label: '用户',
        icon: Users,
        path: '/dashboard/user'
    },
]
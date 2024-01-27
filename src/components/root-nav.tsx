"use client"
import Image from "next/image"
import ModeToggle from "./mode-toggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Menus } from "@/config/menus"
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export default function RootNav() {
    const pathnae = usePathname()
    const router = useRouter()
    const MenuComponent = useMemo(() => {
        return (
            <div className="flex gap-1">
                {
                    Menus.map(menu => (
                        <Link href={menu.path} key={menu.path}>
                            <div className={cn(
                                "rounded-md px-3 py-2 flex justify-center items-center hover:bg-accent transition-all",
                                pathnae === menu.path ? "bg-accent" : "bg-transparent"
                            )}>
                                <menu.icon className="w-4 h-4"></menu.icon>
                                <p className="text-sm px-2">{menu.label}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }, [pathnae])

    const signOutHandler = () => {
        router.push("sign-in")
    }
    return (
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
            <Image src="/gdn.svg" width={38} height={38} alt="logo" />
            {MenuComponent}
            <div className="h-full w-fit flex items-center justify-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={signOutHandler}>退出登陆</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </div>
        </div>
    )
}
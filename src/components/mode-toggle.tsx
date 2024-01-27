"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle"
export default function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    if (!theme) return null
    if (theme === 'light') return <Toggle onClick={() => setTheme("dark")}><Moon /></Toggle>
    if (theme === 'dark') return <Toggle onClick={() => setTheme("light")}><Sun /></Toggle>
}
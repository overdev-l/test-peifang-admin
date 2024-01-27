import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import '../globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GDN|admin login',
  description: 'globals developer navigator',
}

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full h-full' suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "w-full h-full"
      )}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

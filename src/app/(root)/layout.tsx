import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import RootLayout from '@/components/root-layout'
import '../globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GDN|admin',
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
          <RootLayout>
            {children}
          </RootLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

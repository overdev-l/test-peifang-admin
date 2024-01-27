import { Card } from "./ui/card" 
export function PageWapper(
    {
         children 
    }: {
        children: React.ReactNode
    }
) {


    return (
        <section className="w-full h-full flex flex-col gap-2">
            {children}
        </section>
    )
}


export function PageHeader({ children }: {
    children: React.ReactNode
}) {
    return (
        <Card className="w-full h-fit p-6 flex gap-1.5">
            {children}
        </Card>
    )
}

export function PageContent({ children }: {
    children: React.ReactNode
}) {
    return (
        <Card className="w-full flex-1 p-6">
            {children}
        </Card>
    )
}

export function PageFooter({ children }: {
    children: React.ReactNode
}) {
    return (
        <Card className="w-full h-fit p-6">
            {children}
        </Card>
    )
}
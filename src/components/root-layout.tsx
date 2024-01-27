import RootNav from "./root-nav"
export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <main className="w-full h-full flex flex-col">
            <div className="w-full h-12 px-20 py-3 shadow-sm flex items-center">
                <RootNav></RootNav>
            </div>
            <div className="w-full flex-1 flex  max-w-7xl mx-auto">
                <div className="h-full flex-1 p-6">
                    {children}
                </div>
            </div>
        </main>
    )
}
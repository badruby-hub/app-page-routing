import { Navigation } from "@/components/navigation/header";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return(
    <html lang="en">
        <body>
            <Navigation/>
           <main>
            <h1>App Router</h1>
             {children}
           </main>
        </body>
    </html>
    );
}
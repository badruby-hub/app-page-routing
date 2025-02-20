import { ServerComponentAccountButton } from "@/components/account-button-rsc";
import { Navigation } from "@/components/navigation/header";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return(
    <html lang="en">
        <body>
            <Navigation>
                <ServerComponentAccountButton/>
            </Navigation>
           <main>
            <h1>App Router</h1>
             {children}
           </main>
        </body>
    </html>
    );
}
import { SessionProvider } from "next-auth/react";
import { Navigation } from "@/components/navigation/header";
import { ClientComponentAccountButton } from "@/components/account-button-cc";
import type { AppProps } from "next/app";
export default function App({ 
    Component,
    pageProps:{session, ...pageProps}
 }: AppProps) {
    return<>
    <SessionProvider session={session}>
    <Navigation>
      <ClientComponentAccountButton/>
    </Navigation>
    <h1>Custom Page router</h1>
      
    <Component {...pageProps} />
    </SessionProvider>
     </>
  }
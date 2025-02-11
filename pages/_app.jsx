import { SessionProvider } from "next-auth/react";
import { Navigation } from "@/components/navigation/header";
export default function App({ 
    Component,
    pageProps:{session, ...pageProps}
 }) {
    return<>
    <Navigation/>
    <h1>Custom Page router</h1>
      <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider>
     </>
  }
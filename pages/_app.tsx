import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/pages/Header";
import {Toaster} from "react-hot-toast";
import { SessionProvider } from "next-auth/react";


export default function App({ Component,pageProps:{session, ...pageProps} }: AppProps) {
  return<>
    <SessionProvider session={session}>
  <Header/>
  <main>
  <Component {...pageProps} />
  <Toaster  
  position="bottom-right"
  reverseOrder={false}/>
  </main>
  </SessionProvider>
   </>
}
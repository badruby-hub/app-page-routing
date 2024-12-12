import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/pages/Header";
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return<>
  <Header/>
  <main>
  <Component {...pageProps} />
  <Toaster  
  position="bottom-right"
  reverseOrder={false}/>
  </main>
   </>
}
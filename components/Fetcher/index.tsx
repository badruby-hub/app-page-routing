import { Err } from "@/components/Error";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";

interface FetcherProps{
    url: string;
    onload: (result: any) => void;
    children:React.ReactNode;
}


export function Fetcher({url, onload, children}:FetcherProps) {
    const 
       [data,setData]= useState(null),
       [error,setError]= useState<Error | null>(null);
       console.debug('Fetcher render');
    
       useEffect(()=>{
        console.debug('useEffect');
        setData(null);
        setError(null);
async function go() {
   
    try {
        const 
        responce = await fetch(url),
        result = await responce.json();
        setData(result);
        onload(result);
    } catch (err) {
        setError(err as Error)
    }
};
     go();
       },[url]);

    if (error)
        return <Err error={error}/>
   if(data)
        return <>{children}</>
    return <Spinner/>
    }
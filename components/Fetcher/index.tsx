import { Error } from "@/components/Error";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";




export function Fetcher({url, onload, children}) {
    const 
       [data,setData]= useState(null),
       [error,setError]= useState(null);
       console.debug('Fetcher render');
    
       useEffect(()=>{
        console.debug('useEffect');
        setData(null);
        setError(null);
async function go() {
    const 
        responce = await fetch(url),
        result = await responce.json();
    try {

        setData(true);
        onload(result);
    } catch (err) {
        setError(err)
    }
};
     go();
       },[url]);

    if (error)
        return <Error error={error}/>
   if(data)
        return <>{children}</>
    return <Spinner/>
    }
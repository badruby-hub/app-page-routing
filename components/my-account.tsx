"use client"
import { $myAccount } from "@/store/api";
import { useSession } from "next-auth/react";
import { useStore } from "@nanostores/react";

export function MyAccount (){
    const session = useSession();
    return <>
    <h1>MyAccount</h1>
    client session = {JSON.stringify(session)}
    <hr/>
    server session = <ServerSession/>
    </>
}


export function ServerSession() {
    const {data, loading,error} = useStore($myAccount);
    if(error) return <>Error!={String(error)}</>;
    if(loading) return <>loading...</>;
    return <>{JSON.stringify(data)}</>;
}
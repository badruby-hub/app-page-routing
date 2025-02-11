import { useSession,signIn, signOut } from "next-auth/react"

export default function Page() {
   return <>
   <h1>home</h1>
   <Account/>
   </>
}

function Account() {
    const {data: session} = useSession();
    if (session) {
        return <>
        <h1> Hello </h1>
        {session?.user?.name} ({session?.user?.email})<br/>
        {session?.user?.image && <img src={session?.user?.image} style={{width:"50px", borderRadius:"50%"}}/>}
         <button onClick={()=>signOut()}>Выйти </button>
    </>  
    }
    return (
        <>
        Войдите в профиль <br/>
        <button onClick={()=>signIn()}>Войти</button>
        </>
    )
      
}
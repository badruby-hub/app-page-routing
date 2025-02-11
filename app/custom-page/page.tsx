import { auth, signIn, signOut } from "@/auth"

export default function Page() {
    return(
        <>
        <h1>
        custom page
       </h1>
       <Account/>
       </>
    )
}

  async function Account() {
    const session = await auth()

if (session) {
        return <>
        <h1> Hello </h1>
        {session?.user?.name} ({session?.user?.email})<br/>
        {session?.user?.image && <img src={session?.user?.image} style={{width:"50px", borderRadius:"50%"}}/>}
        <SignOut/>
    </>  
    }
     return (
         <>
         Войдите в профиль <br/>
         <SignIn/>
         </>
     )
}





 function SignIn() {
    return (
        <form action={async ()=>{
            "use server"
            await signIn()
        }}>
            <button>Войти</button>
        </form>
    )
}

 function SignOut() {
    return (
        <form action={async ()=>{
            "use server"
            await signOut()
        }}>
            <button>выйти</button>
        </form>
    )
}
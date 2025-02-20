import { useSession,signIn, signOut } from "next-auth/react"
import { AccountInfo } from "./account-info";


export function ClientComponentAccountButton() {
    const {data: session} = useSession();
     return <AccountInfo session={session}
             SignInButton={SignInButton}
             SignOutButton={SignOutButton}/>
           
}

function SignInButton() {
    return <button onClick={()=>signIn()}>Войти</button>
}

function SignOutButton() {
    return <button onClick={()=>signOut()}>Выйти</button>
}
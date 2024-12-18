import { useSession, signIn, signOut } from "next-auth/react"
import classes from "./Button.module.css"
export default function Log() {
  const { data: session } = useSession()
  if (session) {
    return <>
    <div className={classes.sing}>
     <button  onClick={() => signOut()}>Выйти</button>
     <div>
        {session.user?.image && <img className={classes.avatar}  src={session.user?.image}/>}
        </div>
        </div>
      </>
  }
  return  <>
      <button className={classes.sing} onClick={() => signIn()}>Войти</button>
    </>
}
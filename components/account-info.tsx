import classes from "@/components/header.module.css";
import { Session } from 'next-auth';
import { FunctionComponent } from "react";

export function AccountInfo({session,SignInButton,SignOutButton}:{ session: Session | null, SignInButton: FunctionComponent, SignOutButton: FunctionComponent }){
    if (session?.user)
        return <div className={classes.block__btn__auth}>
    {session?.user?.name} ({session?.user?.email})<br/>
    {session?.user?.image && <img src={session?.user?.image} style={{width:"50px", borderRadius:"50%"}}/>}
    <SignOutButton/>
        </div> ;

   return <div className={classes.block__btn__auth}>
    <p className={classes.block__btn__text}>Вы не вошли в аккаунт</p>
     <SignInButton/>
     </div>
    
}

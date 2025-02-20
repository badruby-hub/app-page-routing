import {signIn, signOut,auth } from "@/auth";
import classes from "@/components/header.module.css";
import { AccountInfo } from "./account-info";

export async function ServerComponentAccountButton() {
    const session = await auth();
    return <AccountInfo session={session} SignInButton={SignInForm} SignOutButton={SignOutForm} />
  }


export function SignInForm() {
    return (
        <form className={classes.form__auth} action={async ()=>{
            "use server"
            await signIn()
        }}>
            <button className={classes.btn__auth}>Войти</button>
        </form>
    )
}

export function SignOutForm() {
    return (
        <form className={classes.form__auth} action={async ()=>{
            "use server"
            await signOut()
        }}>
            <button className={classes.btn__auth}>выйти</button>
        </form>
    )
}
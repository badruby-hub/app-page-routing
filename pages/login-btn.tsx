import { useSession, signIn, signOut } from "next-auth/react"
import Head from "next/head";

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return <>
      <Head>
        <title>Регистарция</title>
      </Head>
        Signed in as {session.user?.name} <br />
        {session.user?.image && <img src={session.user?.image}/>}
        <button onClick={() => signOut()}>Sign out</button>
      </>
  }
  return  <>
   <Head>
        <title>Регистарция</title>
      </Head>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
}
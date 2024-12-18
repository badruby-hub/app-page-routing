import Head from "next/head";
import { useSession } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()
  if (session) {
return<>
 <Head>
      <title>ToDo</title>
    </Head>
</>
  }
  return<>
  <div className='warning'>Войдите в аккаунт</div>
  </>
}


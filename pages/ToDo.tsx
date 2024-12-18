import { ToDoSwr } from "@/components/ToDo-SWR/Todo-swr";
import { useSession } from "next-auth/react"
import Head from "next/head";


export default function ToDo(){
    const { data: session } = useSession()
    if (session) {
return<>
   <Head>
        <title>ToDo</title>
      </Head>
<ToDoSwr/>
</>
    }
    return<>
    <div className='warning'>Войдите в аккаунт</div>
    </>
}
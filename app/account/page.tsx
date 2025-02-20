import { auth } from "@/auth";
import { MyAccount, ServerSession } from "@/components/my-account";

export default async function PageAccount(){
    const
    // response = await fetch("http://localhost:3000/api/myaccount/"),
    // obj = await response.json(),
    session = await auth();
    return <>
      <h1>My Account</h1>
      RSC session = {JSON.stringify(session)}
      <hr/>
      server session = <ServerSession/>
      {/* <hr/>
      fetch from RSC result = {JSON.stringify(obj)} */}
    </>
}
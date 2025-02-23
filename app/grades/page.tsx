import { GetGrades } from "@/components/get-grades";
import { getRole } from '@/lib/role';
import { auth } from '@/auth';

export default async function Page(){
    const 
    session = await auth(),
    role = await getRole(session);
    return <>
        <h1>Grades</h1>
        <GetGrades role={role} />
    </>
}

import {prisma} from "@/prisma/prisma"


const
  roles = ["admin", "student", "teacher"] as const ;

export type Role = typeof roles[number]|null;

export async function getRole(session: any|null): Promise<Role>{
    if("admin" === session?.user?.role)
    return "admin";
const 
    userId = session?.user?.id;
    if(!userId) return null;
    if(await prisma.student.findFirst({where:{userId}}))
        return "student";
    if(await prisma.teacher.findFirst({where:{userId}}))
        return "teacher";
    return null;
    
}
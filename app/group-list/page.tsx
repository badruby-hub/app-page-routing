import { GroupList } from "@/components/group-list";
import { prisma } from "@/prisma/prisma";

export default async function Page (){
    const 
    //  response = await fetch('http://localhost:3000/api/group'),
     groups = await prisma.group.findMany();
     return<GroupList groups={groups} />
}
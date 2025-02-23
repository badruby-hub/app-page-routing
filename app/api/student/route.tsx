import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import {  NextResponse} from "next/server";

export async function GET(){
const session =  await auth();
if(!session?.user) return NextResponse.json({error:"Unautorized"}, {status:401});

const student =  await  prisma.student.findMany( { include:{ group: { select: { name:true } } } } );
console.log("strudent", student);
return NextResponse.json(
 student
)
}


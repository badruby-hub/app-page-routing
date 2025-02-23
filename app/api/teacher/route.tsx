import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import {  NextResponse} from "next/server";

export async function GET(/*req: NextRequest*/){
// console.log("req=",req);
const session =  await auth();
if(!session?.user) return NextResponse.json({error:"Unautorized"}, {status:401});

const teachers =  await  prisma.teacher.findMany();
return NextResponse.json(
 teachers
)
}
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { NextResponse/*, type NextRequest */} from "next/server";

export async function GET(/*req: NextRequest*/){
   
// console.log("req=",req);

return NextResponse.json(
  await  prisma.group.findMany()
)
}
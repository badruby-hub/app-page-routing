import { auth } from "@/auth";
import { NextResponse/*, type NextRequest */} from "next/server";

export async function GET(/*req: NextRequest*/){
// console.log("req=",req);
const data = await auth();
return NextResponse.json(data)
}
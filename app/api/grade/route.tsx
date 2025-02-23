import { auth } from "@/auth";
import { getRole } from "@/lib/role";
import { prisma } from "@/prisma/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(/*req: NextRequest*/){
  const session =  await auth();
  const role = await getRole(session);
  const userId = session?.user?.id;
  console.log({ role, userId, user: session?.user });
  switch (role) {
    case "admin":
      return NextResponse.json(
        await prisma.grade.findMany()
      );
    case "student":
      const 
       studentId =(await prisma.student.findFirst({where: { userId } }))?.id;
      return NextResponse.json(
        await prisma.grade.findMany({
          where: {
           studentId
          }
        }));
    case "teacher":
      const 
        teacherId = (await prisma.teacher.findFirst({where: { userId } }))?.id;
        return NextResponse.json(
          await prisma.grade.findMany({
            where: {
              teacherId
            }
          }));
      default:
      return NextResponse.json({error: "Unauthorized"}, {status:401});
  }
 
}


export async function POST(request: NextRequest) {
  const
    session = await auth(),
    role = await getRole(session),
    userId = session?.user?.id;
    console.log('POST API grade',{ role, userId, user: session?.user });
    console.log('request=', request);
  switch (role) {
    case "teacher":
      const
        teacherId = (await prisma.teacher.findFirst({ where: { userId } }))?.id;


        if (teacherId === undefined) {
          return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }
        const
        { studentId, point } = await request.json();
        
      return NextResponse.json(
        await prisma.grade.create({
          data: {
            teacherId,
            studentId:+studentId,
            point:+point
          }
        })
      );
    default:
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}


export async function DELETE(request: NextRequest) {
  const
    session = await auth(),
    role = await getRole(session),
    userId = session?.user?.id;
  switch (role) {
    case "teacher":
      const
        teacherId = (await prisma.teacher.findFirst({ where: { userId } }))?.id,
        { id } = await request.json();
      return NextResponse.json(
        await prisma.grade.delete({
          where: { id }
        })
      );
    default:
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
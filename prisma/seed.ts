import { type Group, type User, type Student, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

main();

async function createGroups() {
    const data: Group[] = [
      { id: 1, name: 'Frontend' },
      { id: 2, name: 'Backend' },
      { id: 3, name: 'Python' }
    ]
    return await prisma.group.createMany({
      data
    });
  }

async function createStudent() {
    const data: Student[] = [
       {id:1, name:'Сергей', surname:'Петров', age:28, groupId:1 },
       {id:2, name:'Иван', surname:'Николаевич', age:25, groupId:1 },
       {id:3, name:'Николай', surname:'Андреевич', age:20, groupId:3 },
       {id:4, name:'Анастасия', surname:'Александровна', age:75, groupId:2 },
    ]
        return await prisma.student.createMany({data
    });
}


async function createUsers() {
    const data: User[] = [
      { id: '1',
        name: 'John',
        email: 'test@test.com',
        createdAt: new Date,
        updatedAt: new Date,
        image: null,
        emailVerified: new Date
     }
    ]
    return await prisma.user.createMany({
      data
    });
  
  }


async function main() {
    try {
const group = await createGroups(),
      student = await createStudent(),
      user = await createUsers();
console.log('main',group,student, user);

    }catch(error){
        console.log('error', error)
    }finally{
         prisma.$disconnect()
    }
}
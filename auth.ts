import NextAuth  from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Vk from "next-auth/providers/vk"
import Yandex from "next-auth/providers/yandex";



const prismaDB = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Google,
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID, 
      clientSecret: process.env.AUTH_YANDEX_SECRET,
    }),
    Vk({
      clientId: process.env.AUTH_VK_ID, 
      clientSecret: process.env.AUTH_VK_SECRET,
     }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        // Return null if user data could not be retrieved

        if ('1' === credentials?.username && '1' === credentials.password) {
          const user = await prismaDB.user.findFirst({ where: { id: '1' } });
          console.log('authorize user=', user);
          return user;
            }
            switch(credentials.username){
              case 'admin':
                if ( 'admin' === credentials.password) {
                  const user = await prismaDB.user.findFirst({ where: { id: '2' } });
                  return user;
            }
            case "student":
              if ( 'student' === credentials.password) {
                const user = await prismaDB.user.findFirst({ where: { id: '4' } });
                return user;
          }
             case "teacher":
              if ( 'teacher' === credentials.password) {
                const user = await prismaDB.user.findFirst({ where: { id: '5' } });
                return user;
          }
          
          }
          return null
        }
    })
  
],
callbacks: {
  jwt({ token, user }: { token: any; user: any }) {
    if (user) {
      token.id = user?.id as string;
      token.role = user?.role as string;
    }
    return token
  },
  session({ session, token }: { token: any; session: any }) {
    if (session.user) {
      session.user.id = token?.id as string;
      session.user.role = token?.role as string;
    }
    return session;
  }
}
})

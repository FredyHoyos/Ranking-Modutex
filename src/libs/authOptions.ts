// src/libs/authOptions.ts
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Nombre de usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.name || !credentials?.password) {
          throw new Error("Nombre y contraseña requeridos");
        }

        // Buscar usuario por nombre
        const user = await prisma.user.findUnique({
          where: { name: credentials.name },
        });

        if (!user) throw new Error("Credenciales inválidas");

        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if (!validPassword) throw new Error("Credenciales inválidas");

        // Retornamos tipado como User
        return {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as User).role; // 👈 casteo seguro
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/Login",
  },
};

// next-auth.d.ts
import NextAuth from "next-auth";
import type { User } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    name: string;
  }
}

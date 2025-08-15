// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/libs/authOptions";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: authOptions.secret });

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/auth/Login";
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"]
};

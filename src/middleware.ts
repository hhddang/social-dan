import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/sign-up";

  // if (token) {
  //   if (isAuthPage) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (isAuthPage) {
  //   return NextResponse.next();
  // }

  // if (pathname === "/") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/sign-up"],
};

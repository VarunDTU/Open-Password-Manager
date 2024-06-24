import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token") || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL("/profile/setmasterpassword", request.nextUrl)
    );
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/profile",
    "/profile/setmasterpassword",
  ],
};

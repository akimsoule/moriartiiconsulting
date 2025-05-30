import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { authenticated } = await isAuthenticated(req);
  if (!authenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/(blog|calendar|contact|faq|services|team|testimonial|user|.*)/:path*",
  ],
};

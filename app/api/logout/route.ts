import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Supprime le cookie JWT côté serveur
  const res = NextResponse.json({ success: true });
  res.cookies.set("auth-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

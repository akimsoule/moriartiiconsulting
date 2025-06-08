import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Supprime le cookie JWT côté serveur avec l'API adaptée à l'App Router
  cookies().set("auth-token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { ALLOWED_USERS } from "../data";
import { verifyCaptcha } from "@/lib/captcha/server";

export async function POST(req: NextRequest) {
  const captchaValid = await verifyCaptcha(req);
  if (!captchaValid) {
    return NextResponse.json({ error: "Captcha invalide." }, { status: 403 });
  }
  const body = await req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "Impossible de créer le compte." },
      { status: 409 }
    );
  }
  // Limiter l'inscription aux deux emails autorisés
  if (!ALLOWED_USERS.includes(email)) {
    return NextResponse.json(
      { error: "Inscription non autorisée pour cet email." },
      { status: 403 }
    );
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });
  const token = await generateToken(user);
  const res = NextResponse.json({ success: true });
  res.cookies.set("auth-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

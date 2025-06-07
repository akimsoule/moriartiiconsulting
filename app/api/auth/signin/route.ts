import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePasswords, generateToken } from "@/lib/auth";
import { ALLOWED_USERS } from "../data";
import { verifyCaptcha } from "@/lib/captcha/server";

export async function POST(req: NextRequest) {
  const captchaValid = await verifyCaptcha(req);
  if (!captchaValid) {
    return NextResponse.json({ error: "Captcha invalide." }, { status: 403 });
  }
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email et mot de passe requis." },
      { status: 400 }
    );
  }
  // Limiter la connexion aux deux emails autorisés
  if (!ALLOWED_USERS.includes(email)) {
    return NextResponse.json(
      { error: "Connexion non autorisée pour cet email." },
      { status: 403 }
    );
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error();
    const valid = await comparePasswords(password, user.password);
    if (!valid) throw new Error();
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
  } catch {
    return NextResponse.json(
      { error: "Identifiants invalides." },
      { status: 401 }
    );
  }
}

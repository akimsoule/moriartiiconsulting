"use server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { comparePasswords, generateToken, hashPassword } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return { error: "Email et mot de passe requis." };
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Utilisateur introuvable." };
  }
  const valid = await comparePasswords(password, user.password);
  if (!valid) {
    return { error: "Mot de passe incorrect." };
  }
  const token = await generateToken(user);
  cookies().set("auth-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { success: true };
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!name || !email || !password) {
    return { error: "Tous les champs sont requis." };
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Cet email est déjà utilisé." };
  }
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });
  const token = await generateToken(user);
  cookies().set("auth-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return { success: true };
}

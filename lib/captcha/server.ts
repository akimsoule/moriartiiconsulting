"use server";

import { NextRequest } from "next/server";

export async function verifyCaptcha(req: NextRequest): Promise<boolean> {
  try {
    if (req.method !== "POST") return false;
    const token = req.headers.get("x-captcha-token");
    if (!token) return false;
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return false;
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const data = await res.json();
    return data.success === true && (data.score === undefined || data.score > 0.5);
  } catch {
    return false;
  }
}


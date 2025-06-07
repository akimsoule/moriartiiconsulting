import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.NEXTAUTH_SECRET;
const secret = new TextEncoder().encode(JWT_SECRET);
const ADMIN_USERS = ["soule_akim@yahoo.fr"];

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function generateToken(user: Partial<User>): Promise<string> {
  let role = 'user';
  if (user.email && ADMIN_USERS.includes(user.email)) {
    role = 'admin';
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: role,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getUserFromRequest(req: NextRequest): Promise<any> {
  const token = req.cookies.get('auth-token')?.value;
  if (!token) return null;

  return await verifyToken(token);
}

export async function isAuthenticated(
  req: NextRequest,
  requiredRole?: string
): Promise<{ authenticated: boolean; user?: any }> {
  const user = await getUserFromRequest(req);

  if (!user) {
    return { authenticated: false };
  }

  if (requiredRole && user.role !== requiredRole) {
    return { authenticated: false, user };
  }

  return { authenticated: true, user };
}

export async function authResponse(
  status: boolean,
  message: string,
  user?: Partial<User>,
  token?: string
): Promise<NextResponse> {
  if (status && user && token) {
    const response = NextResponse.json({
      status,
      message,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ status, message });
}



'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ Only true in production
    sameSite: 'lax' as const,
    path: '/',
  },
  duration: 1 * 60 * 60 * 1000, // 1 hour
};

export async function createSession(token: string) {
  const expires = new Date(Date.now() + cookie.duration);
  (await cookies()).set(cookie.name, token, {
    ...cookie.options,
    expires,
  });

  redirect('/dashboard');
}

export async function verifySession() {
  const token = (await cookies()).get("session")?.value;

  try {
    const response = await fetch(`${BACKEND_URL}/auth/verify-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("❌ verifySession error:", error);
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect('/login');
}

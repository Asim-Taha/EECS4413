'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const cookie = {
    name: 'session',
    options: {httpOnly: true, secure: true, sameSite: 'lax' as const, path:'/'},
    duration: 1 * 60 * 60 * 1000, // 1hr 
}

export async function createSession(token : string){
    const expires = new Date(Date.now() + cookie.duration);
    //used after user login or signup 
    (await cookies()).set(cookie.name,token,{...cookie.options, expires})
    
    redirect('/dashboard')
}

export async function verifySession(){
    const token = (await cookies()).get(cookie.name)?.value
    try{
        const response = await fetch(`${BACKEND_URL}/auth/verify-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          })
          if (!response.ok){
                redirect('/login')
          };
        const data = await response.json();
          return data.user
    }catch(error){
        return (error as Error).message
    }
    
}

export async function deleteSession() {
    (await cookies()).delete(cookie.name)
    redirect('/login')
}
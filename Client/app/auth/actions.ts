'use server';

import { z } from 'zod';
import { createSession, deleteSession } from './session';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

 const loginSchema = z.object({
  email: z.string().email({message:"Invalid email address"}).trim(),
  password: z.string().min(6, {message: "Password must be at least 8 characters"}).trim(),
 })

 const signUpSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
  email: z.string().email({message:"Please enter a valid email"}).trim(),
  password: z.string().min(6, {message: "Password must be at least 8 characters"}).trim(),
 })

//register user 

 export async function signUp(prevState:any, formData: FormData){
  //validate form fields
  const result = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get('password')
  })

  if(!result.success){
    return {
      errors: result.error.flatten().fieldErrors
    }
  }
//create user 
  const {name,email,password} = result.data
  let session : string; 
  try{
    const response = await fetch(`${BACKEND_URL}/auth/register`,{
      method:'POST',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    })
    const data  = await response.json()
    if(!response.ok){
      return {
        message: data.message
      }
    }
    session = data.data.accessToken;
  }catch(error){
     return {
      message: (error as Error).message
      }
    }
//create session 
  await createSession(session)

 }

// sign in user

 export async function logIn(prevState:any, formData: FormData) {
  //validate form fields
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get('password')
  })

  if(!result.success){
    return {
      errors: result.error.flatten().fieldErrors
    }
  }
//login user  
  const {email,password} = result.data
  let session : string; 
  try{
    const response = await fetch(`${BACKEND_URL}/auth/login`,{
      method:'POST',
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
    })
    const data  = await response.json()
    if(!response.ok){
      return {
        message: data.message
      }
    }
    session = data.data.accessToken;
  }catch(error){
     return {
        message: (error as Error).message
      }
    }
//create session 
  await createSession(session)
 }

//Sign out user 
export async function logOut() {
 await deleteSession();
}

 export async function UploadImage(prevState:String | undefined, formData: FormData) {
  return undefined;
 }

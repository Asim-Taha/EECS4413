import { cache } from "react";
import { verifySession } from "../auth/session"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getUser = cache(async () => {
    //verify user session 
    const session = await verifySession();

    //fetch user info 
    //session currently returns the user object 
    return session
})
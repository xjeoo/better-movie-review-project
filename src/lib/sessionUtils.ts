import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./jwt";
import { userInfo } from "@/types/entites";

export async function getToken(){
  const cookie = await cookies();
  const jwt = cookie.get('session')?.value;
  return jwt || null;
}

export async function getSession(): Promise<userInfo | null>{
  const cookie = await cookies();
  const jwt = cookie.get('session')?.value;
  if(!jwt){
    console.log(`Can't get session: User not logged in`);
    return null;
  }
  const userInfo = await decrypt(jwt.toString());
  if(!userInfo){
    console.log(`Can't get session: Decrypt failed`);
    return null;
  }
  
  return userInfo.data as userInfo;
}

export async function updateSession(request : NextRequest){
  const session = request.cookies.get('session')?.value
  if(!session)
    return null;

  const newExpirationTime = new Date(Date.now() + 1000 * 60 * 60) ;
  // const newExpirationTime = new Date(Date.now() + 1000 * 15) ; //15 sec pentru test

  const decrypted = await decrypt(session);
  if(decrypted === undefined) {
    console.warn("Session decryption failed.");
    return null; 
  }

  const currentTime = Math.floor( Date.now() / 1000 );
  const issuedAt = decrypted.iat //  
  const expirationTime = decrypted.exp;
  const totalDuration = expirationTime! - issuedAt!;
  const timeLeft = expirationTime! - currentTime!;
  if(timeLeft >= totalDuration / 4 )
  {
    return null;

  }

  decrypted!.expiresAt = newExpirationTime;
 
  const newPayload = await encrypt(decrypted as userInfo, newExpirationTime);

  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: newPayload,
    httpOnly: true,
    secure: process.env.SECURE_COOKIES === "true",
    expires: newExpirationTime
  })

  return res;
}

export async function logout(){
  const cookie = await cookies();
  cookie.set("session", "", { expires: new Date(0) });
}
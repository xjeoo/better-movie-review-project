import { error } from "console";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.SESSION_SECRET;
const encodedSecret = new TextEncoder().encode(secret);

export async function encrypt(payload: any, expiresAt: Date) {
  const safePayload = JSON.parse(JSON.stringify(payload));
  const expirationTime = Math.floor(expiresAt.getTime() / 1000)
  return new SignJWT(safePayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}


export async function updateSession(request : NextRequest){
  const session = request.cookies.get('session')?.value
  if(!session)
    return null;

  console.log("a intrat")

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
    console.log("NO REFRESH")
    return null;

  }

 
  decrypted!.expiresAt = newExpirationTime;
 
  const newPayload = await encrypt(decrypted, newExpirationTime);

  console.log("REFRESH")

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
import { SessionPayload } from "@/types/auth";
import { jwtVerify, SignJWT } from "jose";


const secret = process.env.SESSION_SECRET;
const encodedSecret = new TextEncoder().encode(secret);


export async function encrypt(payload: SessionPayload, expiresAt: Date) {
  const safePayload = JSON.parse(JSON.stringify(payload));
  const expirationTime = Math.floor(expiresAt.getTime() / 1000)
  return new SignJWT(safePayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);
}

export async function decrypt(session: string | undefined = ""):Promise<SessionPayload | null>{
  try {
    const { payload } = await jwtVerify(session, encodedSecret, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session", error);
    return null;
  }
}

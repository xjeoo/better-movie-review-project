// app/middleware.ts
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'
import { updateSession } from './lib/sessionUtils';
  const authRoutes = ["/login", "/register"];
  const protectedRoutes = [""];
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const response = await updateSession(req) ?? NextResponse.next();

  const cookie = await cookies();
  const encryptedSession = cookie.get("session")?.value;

  if(protectedRoutes.includes(path) && !encryptedSession)
    return NextResponse.redirect(new URL("/login", req.nextUrl))


  if(authRoutes.includes(path) && encryptedSession )
  {
    // console.log(session)
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }


  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}


import { NextResponse } from "next/server";


export async function GET(){
  
  try {
    const response = NextResponse.json({message: 'Logged out successfuly'}, {status:200})
    response.cookies.set('session', '', { httpOnly: true, expires: new Date(0)});
    return response;
  } catch (err) {
    return NextResponse.json({error: err},{status:500});
  }
}
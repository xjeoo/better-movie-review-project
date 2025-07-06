
import { userInfo } from "../types/entites";
import { cookies  } from "next/headers";
import dbConnect from "./database";
import  User  from "@/models/User";
import { decrypt, encrypt } from "./sessionUtils";
import mongoose from "mongoose";
import { stringify } from "querystring";
import { NextRequest, NextResponse } from "next/server";
import { SessionPayload } from "@/types/auth";





export async function createSession(userInfo : userInfo){
  const jwtExpiresAt = new Date(Date.now() + 1000 * 60 * 60);
  // const jwtExpiresAt = new Date(Date.now() + 1000 * 15); // 15 sec pentru test


  await dbConnect();

  const user = await User.findOne({email: userInfo.email});


  const newUserInfo = {
    userId: user._id,
    username: user.username,
    email: user.email,
    image: user.image,
    role: user.role
  }

  const session = await encrypt({data: newUserInfo, expiresAt: jwtExpiresAt}, jwtExpiresAt)

  const cookie = await cookies();

   cookie.set("session", session, {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES === "true",
    expires: jwtExpiresAt,
  });
}

 
export async function createGoogleSession(email: string){
   const jwtExpiresAt = new Date(Date.now() + 1000 * 60 * 60);
  // const jwtExpiresAt = new Date(Date.now() + 1000 * 15); // 15 sec pentru test 

  await dbConnect();

  const user = await User.findOne({email: email});

  const userInfo = {
    userId: user._id,
    username: user.username,
    email: user.email,
    image: user.image,
    role: user.role
  }

  const session = await encrypt({data: userInfo, expiresAt: jwtExpiresAt}, jwtExpiresAt)

  const cookie = await cookies();

   cookie.set("session", session, {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES === "true",
    expires: jwtExpiresAt,
  });
}





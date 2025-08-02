"use server";

import { validateLoginForm, validateRegisterForm } from "@/lib/auth/auth";
import { AuthActionState, loginData, registerData, validateCredentialsResponse } from "../types/auth";
import dbConnect from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth/session";




export async function validateRegisterData( userData : registerData) : Promise<validateCredentialsResponse>{

  const { username, email, password, confirmPassword } = userData;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!username || !email || !password || !confirmPassword)
    return {
      ok: false,
      message: "Fields missing",
    }

  if(username.trim() === "" || username.length <3 || username.length > 20){
    return{
      ok: false,
      message: "Username must be 3-20 characters long"
    }
  }
  else if(password.trim() === "" || password.length<5 || password.length > 100){
    return{
      ok: false,
      message: "Password must be 5-100 characters long"
    }
  }
  else if(email.includes(' ') || !emailRegex.test(email)){
    return {
      ok: false,
      message: "Email is not valid"
    }
  }
  else if(confirmPassword.trim() === "" || confirmPassword.length<5 || 
          confirmPassword.length > 100 || confirmPassword !== password){
    return {
      ok:false,
      message: "Passwords do not match",
    }        
  }

  return {
    ok: true,
    message: "Valid credentials"
  }
}


export async function validateLoginData( userData : loginData) : Promise<validateCredentialsResponse>{

  const { username, password } = userData;

  if(!username || !password )
    return {
      ok: false,
      message: "Fields missing",
    }

  if(username.trim() === "" || username.length <3 || username.length > 20){
    return{
      ok: false,
      message: "Username must be 3-20 characters long"
    }
  }
  else if(password.trim() === "" || password.length<5 || password.length > 100){
    return{
      ok: false,
      message: "Password must be 5-100 characters long"
    }
  }

  return {
    ok: true,
    message: "Valid credentials"
  }
}



export async function login( prevState: AuthActionState, formData: FormData):Promise<AuthActionState>{
  const isValid = validateLoginForm(formData);

  if(!isValid.ok){
    return {
      ok: false,
      message: isValid.message
    }
  }

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  await dbConnect();
  
    const user = await User.findOne({email: email});
    if(!user){
      return {
        ok:false,
        message: "Invalid credentials",
      }
    }

    const correctPassword = await bcrypt.compare(password!, user.password)

    if(!correctPassword)
      return {
        ok:false,
        message: "Invalid credentials",
      }
    
    const userInfo = {
      userId: user._id,
      email: email!,
      username: user.username,
      image: user.image || "none",
      role: user.role

    }

    await createSession(userInfo);
 
   redirect("/");
  
}

export async function register( prevState: AuthActionState, formData: FormData ):Promise<AuthActionState>{
  const isValid = validateRegisterForm(formData);

  if(!isValid.ok){
    return {
        ok: false,
      message: isValid.message
    }
  }

  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  await dbConnect();

  const userExists = await User.findOne({email: email});
    if(userExists){
      return {
        ok:false,
        message: "User already exists",
    
    };
    }
    const hashedPassword = await bcrypt.hash(password!, 10);
  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image:"none",
      emailVerified: false,
      role: "user"
    })
  
    await newUser.save();

    redirect("/login")


}
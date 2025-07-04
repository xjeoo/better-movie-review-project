"use server";

import { loginData, registerData, validateCredentialsResponse } from "../../types/auth";

export async function loginUser(formData: FormData) {
  const name  = formData.get("username");
  const password = formData.get("password");
   
  // trebuie continuat
  // ... 
}

export async function loginWithGoogle(){

}



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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
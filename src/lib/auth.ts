
import { validateCredentialsResponse } from "../types/auth";



export function validateRegisterForm( formData : FormData) : validateCredentialsResponse{

  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirm-password")?.toString();

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
  
  else if(email.includes(' ') || !emailRegex.test(email)){
    return {
      ok: false,
      message: "Email is not valid"
    }
  }
  else if(password.trim() === "" || password.length<5 || password.length > 100){
    return{
      ok: false,
      message: "Password must be 5-100 characters long"
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


export function validateLoginForm( formData : FormData) : validateCredentialsResponse{

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!email || !password )
    return {
      ok: false,
      message: "Fields missing",
    }

  if(email.includes(' ') || !emailRegex.test(email)){
    return {
      ok: false,
      message: "Email is not valid"
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



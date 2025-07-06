
import { validateCredentialsResponse } from "../types/auth";
import { credentialResponse } from "../types/auth";





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



export function decodeJWT(token: string) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
}

export function handleCredentialResponse(response: credentialResponse) { // urmeaza sa bag functionalitatea in functie de jwt  da plec la sala acum
    console.log("Encoded JWT ID token: " + response.credential);

    const responsePayload = decodeJWT(response.credential);

    console.log("Decoded JWT ID token fields:");
    console.log("  Full Name: " + responsePayload.name);
    console.log("  Given Name: " + responsePayload.given_name);
    console.log("  Family Name: " + responsePayload.family_name);
    console.log("  Unique ID: " + responsePayload.sub);
    console.log("  Profile image URL: " + responsePayload.picture);
    console.log("  Email: " + responsePayload.email);
}





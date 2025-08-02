import { JWTPayload } from "jose";
import { userInfo } from "./entites";

export interface AuthActionState {
  ok: boolean;
  message: string;
}

export type validateCredentialsResponse={
  ok: boolean,
  message: string,
}

export type registerData = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}


export type loginData = {
  username: string,
  password: string,
}

export type credentialResponse ={
        credential: string,
}

export interface SessionPayload extends JWTPayload  {
  data: userInfo;
  expiresAt: Date;
};

export type GoogleUserInfo = {
  email: string | null | undefined,
  name: string | null | undefined,
  googleId: string | null | undefined,
  image?: string | null | undefined,
  emailVerified: boolean,
}
import { userInfo } from "./entites";


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

export type SessionPayload = {
  data: userInfo;
  expiresAt: Date;
};

export type GoogleUserInfo = {
  email: string | null | undefined,
  name: string | null | undefined,
  googleId: string | null | undefined,
  image?: string | null | undefined,
}


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
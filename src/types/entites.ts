import { Types } from "mongoose"

export type userInfo = {
  userId: Types.ObjectId,
  email: string,
  username: string,
  image: string,
  role: string
}
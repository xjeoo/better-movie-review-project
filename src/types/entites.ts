import { Types } from "mongoose"

export type userInfo = {
  userId: Types.ObjectId,
  email: string,
  username: string,
  image: string,
  role: string
}

export type ReviewType = {
  _id: Types.ObjectId | string,
  userId: string,
  movieId: string,
  rating: number,
  text: string,
}
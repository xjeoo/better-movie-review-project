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
  contentId: string,
  type: string,
  rating: number,
  text: string,
  createdAt: Date,
  updatedAt: Date,

}
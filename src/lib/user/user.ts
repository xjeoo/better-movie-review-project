import User from "@/models/User";
import dbConnect from "../database";
import { Types } from "mongoose";
import Review from "@/models/Review";


export async function getUserInfoForReview(userId: string){
  await dbConnect();
  try {
    const userInfo = await User.findById(userId).select("image username");
  return userInfo;
  } catch (err) {
    console.log(err)
  }
  return false; 
}

type userOwnsReviewResponse = {
  ok: boolean,
  message: string,
}
export async function userOwnsReview(userId: string | Types.ObjectId, reviewId: string | Types.ObjectId ) : Promise<userOwnsReviewResponse>{
  await dbConnect();

  try {
    const review = await Review.findById(reviewId);
    if(!review) return{
      ok: false,
      message:"Review does not exist"
    }
    if(review.userId.toString() === userId.toString()) return{
      ok: true,
      message: "User owns review"
    }
    return{
      ok: false,
      message:"User does not own review"
    }
  } catch (error) {
    return {
      ok: false,
      message: "Database operation failed"
    };
  }

}

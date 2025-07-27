"use server"

import { saveReviewToDatabase } from "@/lib/database";
import { getSession } from "@/lib/auth/sessionUtils";

type sumbitResponse={
  ok: boolean,
  text: string;
}
export async function submitReview(prevState: any, formData: FormData) : Promise<sumbitResponse>{
  const ratingAsString = formData.get("rating")?.toString();
  const contentId = formData.get("contentId")?.toString();
  const text = formData.get("text")?.toString();
  const type = formData.get("type")?.toString();
  

  if(!text || !contentId || !ratingAsString) return {
    ok: false,
    text: "Fill in all fields"
  }
  const rating = parseInt(ratingAsString);

  if(rating > 5 || rating < 1) return{
    ok: false,
    text: "Rating must be between 1 and 5"
  }

  if(text.length < 10) return {
    ok: false,
    text: "Review must be at least 10 characters long"
  }
  else if(text.length > 1200) return {
    ok: false,
    text: "Review must not exceed 1200 characters"
  }

  
  
  const user = await getSession();
  if(!user) return {
    ok: false,
    text: "User not logged in"
  }

  try {
    const reviewSaved = await saveReviewToDatabase(contentId, type! , user.userId, rating, text)
    if(!reviewSaved.ok) return {
      ok:false,
      text: reviewSaved.text
    }
    return {
    ok: true,
    text:"Review posted"
  }
  } catch (err) {
    console.log(err);
    return {
    ok: false,
    text:"Failed to save review"
  }
  }
}

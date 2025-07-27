import Review from "@/models/Review";
import dbConnect from "../database";
import Rating from "@/models/Rating";

export async function getReviewsByTvShowId(contentId: string){
  await dbConnect(); // eventual va trebui sa pun paginare

  try {
    const reviews = await Review.find({contentId, type: "tv"});
    return reviews;
  } catch (err) {
    console.log(err);
  }

  return false;
}

export async function getRatingByTvShowId(contentId: string){
  await dbConnect();
  const rating = await Rating.findOne({contentId, type: "tv"});
  if(!rating) return "No rating for this tv show";
  return rating;
}
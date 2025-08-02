import Review from "@/models/Review";
import dbConnect from "../database";
import Rating from "@/models/Rating";
import { Types } from "mongoose";

export async function getReviewsByMovieId(contentId: string){
  await dbConnect(); // eventual va trebui sa pun paginare

  try {
    const reviews = await Review.find({contentId, type: "movie"});
    return reviews;
  } catch (err) {
    console.log(err);
  }

  return [];
}

export async function getRatingByMovieId(contentId: string){
  await dbConnect();
  const rating = await Rating.findOne({contentId, type: "movie"});
  if(!rating) return "No rating for this movie";
  return rating;
}

export async function updateRatingOnCreate(contentId: string, type: string, rating: number){
  await dbConnect();
  try {
  const currentRating = await Rating.findOne({contentId, type});
  if(!currentRating){
    const firstRating = new Rating({
      contentId: contentId,
      type: type,
      averageRating: rating,
      numberOfReviews: 1
    });
    try {
      firstRating.save();
      return true;
    } catch (err) {
      return console.log(err);
    }
  }
    const newAverageRating = ((currentRating.averageRating * currentRating.numberOfReviews) + rating )/(currentRating.numberOfReviews+1);
    const newNumberOfReviews = currentRating.numberOfReviews + 1;
    try {
      currentRating.averageRating = newAverageRating;
      currentRating.numberOfReviews = newNumberOfReviews;
      await currentRating.save();
      return true

    } catch (err) {
      return console.log(err);
    }
  
  } catch (err) {
    return console.log(err);
  }
}

export async function deleteReviewById(reviewId: Types.ObjectId | string){
  await dbConnect();
  try {
    await Review.findByIdAndDelete(reviewId);
    return true;
    
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function editReviewById(reviewId: Types.ObjectId | string, newRating: number, newText: string){
  await dbConnect();
  try {
    const review = await Review.findById(reviewId);
    review.rating = newRating;
    review.text = newText;
    try {
      await review.save();
      return true;
    } catch (err) {
      console.log('Failed updating review:', err);
      return false
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}




export async function updateRatingOnDelete(contentId: string, type: "movie" | "tv", deletedReviewRating: number){
  await dbConnect();
  
  try {
    const currentRating = await Rating.findOne({contentId: contentId, type: type});
    if(!currentRating) return false;

    const newNumberOfReviews = currentRating.numberOfReviews - 1;
    if(newNumberOfReviews === 0){
      try {
        await currentRating.deleteOne();
        return true;
      } catch (err) {
        return console.log("failed deleting rating", err)
      }
    }

    const newAverageRating = ((currentRating.averageRating * currentRating.numberOfReviews) - deletedReviewRating )/newNumberOfReviews;
    try {
      
      currentRating.averageRating = newAverageRating;
      currentRating.numberOfReviews = newNumberOfReviews;
      await currentRating.save();
      return true;

    } catch (err) {
      console.log(err);
      return false;
    }

  } catch (err) {
    console.log(err)
    return false
  }
  
}

export async function updateRatingOnUpdate(contentId: string, type: "movie" | "tv", oldRating: number, newRating: number ){
  await dbConnect();
  try {
    const currentRating = await Rating.findOne({contentId, type});
    if(!currentRating) return false;
    const newAverageRating = ((currentRating.averageRating * currentRating.numberOfReviews) - oldRating + newRating )/ currentRating.numberOfReviews;
    try {
      currentRating.averageRating = newAverageRating;
      await currentRating.save();
      return true
    } catch (err) {
      console.log('Failed updating average rating:',err)
      return false;
    }
  } catch (err) {
    console.log('Database error', err);
    return false;
  }
}

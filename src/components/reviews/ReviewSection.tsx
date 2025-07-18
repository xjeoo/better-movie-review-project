import { getReviewsByMovieId } from "@/actions/reviews";
import React from "react";

const ReviewSection = async ({ movieId }: { movieId: string }) => {
  const reviews = await getReviewsByMovieId(movieId);
  console.log(reviews);
  return <div>ReviewSection</div>;
};

export default ReviewSection;

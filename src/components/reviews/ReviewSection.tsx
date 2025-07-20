import { getReviewsByMovieId } from "@/lib/movies/reviews";
import React from "react";
import Review from "./Review";
import { ReviewType } from "@/types/entites";
import { getSession, getToken } from "@/lib/sessionUtils";
import OwnedReview from "./OwnedReview";

const ReviewSection = async ({ movieId }: { movieId: string }) => {
  const reviews = await getReviewsByMovieId(movieId);
  const user = await getSession();
  const token = await getToken();
  // E CEVA STRICAT CA NU MA LASA SA TRIMIT PROPS CUM VREAU

  console.log(reviews);
  return (
    <div className="w-full sm:w-[65%] lg:w-[50%] flex flex-col gap-2">
      {reviews && reviews.length > 0 ? (
        reviews.map((review: ReviewType, index: number) =>
          user && review.userId.toString() === user?.userId.toString() ? (
            <OwnedReview
              key={index}
              username={user?.username}
              image={user?.image}
              text={review.text}
              rating={review.rating}
              reviewId={review._id.toString()}
              movieId={review.movieId.toString()}
              token={token}
            />
          ) : (
            <Review
              key={index}
              userId={review.userId}
              rating={review.rating}
              text={review.text}
            />
          )
        )
      ) : (
        <p className="pb-5 text-xl pl-3 text-neutral-300">No reviews yet</p>
      )}
    </div>
  );
};

export default ReviewSection;

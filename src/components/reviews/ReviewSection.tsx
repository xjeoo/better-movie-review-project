import { getReviewsByMovieId } from "@/lib/movies/reviews";
import React from "react";
import Review from "./Review";
import { ReviewType, userInfo } from "@/types/entites";
import { getSession, getToken } from "@/lib/auth/sessionUtils";
import OwnedReview from "./OwnedReview";

const ReviewSection = async ({
  movieId,
  token,
  user,
  reviews,
}: {
  movieId: string;
  token: string | null;
  user: userInfo | null;
  reviews: any;
}) => {
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

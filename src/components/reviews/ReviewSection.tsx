import React from "react";
import Review from "./Review";
import { ReviewType, userInfo } from "@/types/entites";
import OwnedReview from "./OwnedReview";

const ReviewSection = async ({
  token,
  user,
  reviews,
  type,
}: {
  token: string | null;
  user: userInfo | null;
  reviews: Array<ReviewType>;
  type: string;
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
              contentId={review.contentId.toString()}
              token={token}
              type={type}
              dates={{
                createdAt: review.createdAt.toISOString(),
                updatedAt: review.updatedAt.toISOString(),
              }}
            />
          ) : (
            <Review
              key={index}
              userId={review.userId}
              rating={review.rating}
              text={review.text}
              dates={{
                createdAt: review.createdAt.toISOString(),
                updatedAt: review.updatedAt.toISOString(),
              }}
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

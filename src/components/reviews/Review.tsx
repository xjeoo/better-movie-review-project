import { starColor } from "@/constants/movies";
import { getUserInfoForReview } from "@/lib/user/user";
import { cn, formatDate, handleProfilePicture } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const Review = async ({
  userId,
  rating,
  text,
  dates,
}: {
  userId: string;
  rating: number;
  text: string;
  dates: { createdAt: string; updatedAt: string };
}) => {
  const userInfo = await getUserInfoForReview(userId);
  return (
    <div className="flex flex-col gap-1 px-3 py-2 rounded-md border-1 border-neutral-800">
      <div className="flex w-fit gap-2 items-center">
        <Image
          src={handleProfilePicture(userInfo.image)}
          alt={`${userInfo.name}'s profile picture`}
          loading="lazy"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{userInfo.username}</span>
          {dates && (
            <span className="text-[0.9em] text-neutral-400">{`${formatDate(
              dates.createdAt.split("T")[0]
            )} ${dates.createdAt !== dates.updatedAt ? "- Edited" : ""}`}</span>
          )}
        </div>
      </div>
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((star, index) => (
          <Star
            key={index}
            className={cn(
              "size-6 cursor-pointer md:hover:scale-110 transition-all"
            )}
            color={index + 1 > rating ? "#b6c1d4" : starColor}
            fill={index + 1 <= rating ? starColor : ""}
            aria-label={`${index + 1} star`}
          />
        ))}
      </div>
      <p className="wrap-break-word">{text}</p>
    </div>
  );
};

export default Review;

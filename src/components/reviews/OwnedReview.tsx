"use client";
import { starColor } from "@/constants/movies";
import { cn, handleProfilePicture } from "@/lib/utils";
import { SquarePen, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OwnedReview = ({
  username,
  image,
  text,
  rating,
  token,
  reviewId,
  movieId,
}: {
  username: string;
  image: string;
  text: string;
  rating: number;
  token: string | null;
  reviewId: string;
  movieId: string;
}) => {
  const router = useRouter();
  const [isDeleting, setisDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!username || !image || !text || !rating) return <div>Loading</div>;
  const handleDelete = async () => {
    const res = await fetch("/api/reviews", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reviewId: reviewId,
        movieId: movieId,
        rating: rating,
      }),
    });
    const data = await res.json();
    console.log(data);
    router.refresh();
  };

  return (
    <div className="relative flex flex-col gap-1 px-3 py-2 rounded-md border-1 border-neutral-800">
      {isDeleting && (
        <>
          <button
            className="absolute flex items-center justify-center right-3 top-3 cursor-pointer z-10"
            onClick={() => setisDeleting(false)}
          >
            <X size={20} />
          </button>
          <div className="absolute left-0 top-0 w-full h-full flex justify-center backdrop-blur-xs rounded-md">
            <div className="flex flex-col gap-3 items-center justify-center">
              <p className="font-bold text-2xl">Delete review?</p>
              <div className="flex gap-4">
                <button
                  className="text-[1.1em] w-12 bg-blue-primary py-1 rounded-xl cursor-pointer hover:opacity-85 transition-opacity"
                  onClick={handleDelete}
                >
                  Yes
                </button>
                <button
                  className="text-[1.1em] w-12 bg-error py-1 rounded-xl cursor-pointer hover:opacity-85 transition-opacity"
                  onClick={() => setisDeleting(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <div className="absolute w-full h-full flex justify-center items-center">
          <button
            className="absolute flex items-center justify-center right-5 top-1 cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {!isDeleting && !isEditing && (
        <div className="absolute right-4 top-3 flex items-center gap-3">
          <button
            className="p-0.5 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen className="size-6.5 text-white" />
          </button>
          <button
            className="p-0.5 cursor-pointer"
            onClick={() => setisDeleting(true)}
          >
            <Trash2 className="size-6.5 text-red-400" />
          </button>
        </div>
      )}
      <div className="flex w-fit gap-2 items-center">
        <Image
          src={handleProfilePicture(image)}
          alt={`${username}'s profile picture`}
          loading="lazy"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-semibold">{username}</span>
      </div>
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((star, index) => (
          <Star
            key={index}
            className={cn(
              "size-6 cursor-pointer hover:scale-110 transition-all"
            )}
            color={index + 1 > rating ? "#b6c1d4" : starColor}
            fill={index + 1 <= rating ? starColor : ""}
            aria-label={`${index + 1} star`}
          />
        ))}
      </div>
      <p className="wrap-break-word ">{text}</p>
    </div>
  );
};

export default OwnedReview;

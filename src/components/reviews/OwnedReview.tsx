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
  const [newRating, setNewRating] = useState(rating);
  const [newText, setNewText] = useState(text);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
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
    if (data.error) setError(data.error);
    else if (data.message) setError(data.message);
    setIsEditing(false);
    router.refresh();
  };

  const handleEdit = async () => {
    if (rating === newRating && text === newText) return setIsEditing(false);

    if (newRating > 5 || newRating < 1)
      return setError("Rating must be between 1-5");

    if (newText.length < 10)
      return setError("Review must be longer than 10 characters");
    else if (newText.length > 1200)
      return setError("Review must be shorter than 1200 characters");
    const res = await fetch("/api/reviews", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reviewId: reviewId,
        movieId: movieId,
        oldRating: rating,
        oldText: text,
        newRating: newRating,
        newText: newText,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setMessage("");
    } else if (data.message) {
      setError("");
      setMessage(data.message);
    }
    setIsEditing(false);
    setError("");
    router.refresh();
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 px-3 py-2 rounded-md border-1 border-neutral-800",
        isEditing && "border-neutral-500"
      )}
    >
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
        <button
          className="absolute flex items-center justify-center right-3 top-1 cursor-pointer"
          onClick={() => setIsEditing(false)}
        >
          <span className="text-[0.9em] text-neutral-200 underline">
            Cancel edit
          </span>
        </button>
      )}

      {!isDeleting && !isEditing && (
        <div className="absolute right-4 top-3 flex items-center gap-3">
          <button
            className="p-0.5 cursor-pointer"
            onClick={() => {
              setNewRating(rating);
              setNewText(text);
              setIsEditing(true);
            }}
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
        {isEditing
          ? Array.from({ length: 5 }).map((star, index) => (
              <Star
                key={index}
                className={cn(
                  "size-6 cursor-pointer scale-105 hover:scale-115  "
                )}
                color={index + 1 > newRating ? "#b6c1d4" : "#5fb8eb"}
                fill={index + 1 <= newRating ? "#5fb8eb" : ""}
                onClick={() => setNewRating(index + 1)}
                aria-label={`${index + 1} star`}
              />
            ))
          : Array.from({ length: 5 }).map((star, index) => (
              <Star
                key={index}
                className={cn("size-6 cursor-pointer hover:scale-110")}
                color={index + 1 > rating ? "#b6c1d4" : starColor}
                fill={index + 1 <= rating ? starColor : ""}
                aria-label={`${index + 1} star`}
              />
            ))}
      </div>
      {error && isEditing && <p className="text-red-400">{error}</p>}

      {isEditing ? (
        <>
          <textarea
            value={newText}
            name="edit-text"
            className="w-full min-h-[110px] text-white bg-neutral-800 rounded-md resize-none outline-0 pl-2 pt-2 pb-1"
            onChange={(e) => setNewText(e.currentTarget.value)}
          />
          <button
            className="w-full py-1 flex justify-center bg-gradient-to-br from-[#5f9beb]/90 to-[#5f9beb]/60 hover:opacity-95 active:opacity-85 rounded-md cursor-pointer"
            onClick={handleEdit}
          >
            Save changes
          </button>
        </>
      ) : (
        <p className="wrap-break-word ">{text}</p>
      )}
    </div>
  );
};

export default OwnedReview;

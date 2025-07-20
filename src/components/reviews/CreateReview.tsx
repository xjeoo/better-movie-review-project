"use client";
import { submitReview } from "@/actions/reviews";
import { starColor } from "@/constants/movies";
import { cn } from "@/lib/utils";
import { userInfo } from "@/types/entites";
import { Divide, LoaderCircle, Lock, Star } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useActionState, useState } from "react";

const CreateReview = ({
  movieId,
  user,
}: {
  movieId: string;
  user: userInfo | null;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState("");
  const [state, registerAction, isPending] = useActionState(
    submitReview,
    undefined
  );

  return (
    <>
      {!user ? (
        <div className="w-fit mx-auto md:mx-0 flex items-center gap-3 border-1 border-neutral-700 rounded-md  px-2 py-4">
          <Lock />

          <div className="w-fit flex flex-col justify-center items-center text-center  ">
            <p className="flex items-center text-xl">
              You must be signed in to leave a review
            </p>
            <div className="flex items-center gap-1.5 text-[1.1em]">
              <Link
                href={"/login"}
                className="text-[1.15em] text-white underline"
              >
                Sign in
              </Link>
              <span>or</span>
              <Link
                href={"/register"}
                className="text-[1.15em] text-white underline"
              >
                Register
              </Link>
              <span>now!</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl md:text-4xl mb-3">Share your thoughts:</h2>
          <form
            action={registerAction}
            className="flex flex-col px-6 py-3 bg-black/80 border-1 border-neutral-700 rounded-md"
          >
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="rating" value={rating} />
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-8 lg:size-7 cursor-pointer hover:scale-110 active:opacity-80 transition-all"
                  )}
                  color={index + 1 > rating ? "#b6c1d4" : starColor}
                  fill={index + 1 <= rating ? starColor : ""}
                  aria-label={`${index + 1} star`}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <div className="w-full sm:w-[65%] lg:w-[50%] flex flex-col gap-2">
              {state !== undefined ? (
                <p
                  className={cn(
                    "text-[1.1em]",
                    state.ok ? "text-blue-300" : "text-error"
                  )}
                >
                  {state.text}
                </p>
              ) : (
                <p className="text-[1.1em]">-Pick a rating-</p>
              )}

              <textarea
                name="text"
                id="text"
                value={text}
                placeholder="Type a review"
                onChange={(e) => setText(e.currentTarget.value)}
                className="min-h-[100px]  bg-neutral-200 rounded-md resize-none text-black outline-0 pl-2 pt-2 pb-1"
              ></textarea>
              <button
                disabled={isPending}
                className={cn(
                  "w-full text-xl py-2 flex justify-center bg-gradient-to-br from-[#5f9beb]/90 to-[#5f9beb]/60 hover:opacity-95 active:opacity-85 rounded-xs cursor-pointer transition-opacity",
                  isPending && "cursor-auto"
                )}
              >
                {!isPending ? (
                  "Post"
                ) : (
                  <LoaderCircle className="size-6 animate-spin" />
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateReview;

"use client";
import { submitReview } from "@/actions/reviews";
import { useActionState } from "react";

const CreateReview = ({ info }: { info?: any }) => {
  const [state, registerAction, isPending] = useActionState(
    submitReview,
    undefined
  );
  return (
    <form action={registerAction} className="flex flex-col px-6 py-3">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <input
            type="radio"
            key={index}
            name="rating"
            className="size-5"
            value={(index + 1).toString()}
          />
        ))}
      </div>
    </form>
  );
};

export default CreateReview;

import React from "react";

const AgeRating = ({ ageRating }: { ageRating: string }) => {
  return (
    <span className=" px-1 py-0.5 border-1 border-white text-xs font-semibold rounded-xs">
      {ageRating}
    </span>
  );
};

export default AgeRating;

import React from "react";

const GenrePill = ({ text }: { text: string }) => {
  return (
    <span className="text-white text-[0.9em] sm:text-[1em] outline-1 outline-white px-1.5 py-0.5 rounded-full">
      {text}
    </span>
  );
};

export default GenrePill;

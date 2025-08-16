import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-fit h-[75dvh] mx-auto pt-[220px]">
      <LoaderCircle size={60} className="animate-spin" color="white" />
    </div>
  );
};

export default loading;

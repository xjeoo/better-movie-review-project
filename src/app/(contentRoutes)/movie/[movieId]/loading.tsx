import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="w-screen h-[90dvh] grid place-items-center">
      <LoaderCircle size={60} className="animate-spin" color="white" />
    </div>
  );
};

export default loading;

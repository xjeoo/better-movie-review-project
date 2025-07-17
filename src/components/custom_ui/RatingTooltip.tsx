import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Star } from "lucide-react";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";

const RatingTooltip = ({ rating }: { rating?: string | null }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger></TooltipTrigger>
        <TooltipContent>
          <p className="px-2 py-1 bg-black border-1 border-white rounded-xl">
            Rating: 5.0/5.0
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RatingTooltip;

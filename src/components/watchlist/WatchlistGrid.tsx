"use client";

import { WatchlistItem as WatchlistItemType } from "@/types/content";
import WatchlistItem from "./WatchlistItem";
import { Film, Tv } from "lucide-react";

const WatchlistGrid = ({
  items,
  filter,
  onDelete,
  onStatusChange,
}: {
  items: WatchlistItemType[];
  filter: "all" | "movie" | "tv";
  onDelete: (contentId: string, type: string) => Promise<void>;
  onStatusChange: (
    contentId: string,
    type: string,
    newStatus: string,
  ) => Promise<void>;
}) => {
  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.type === filter);

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          {filter === "movie" ? (
            <Film className="w-8 h-8 text-zinc-500" />
          ) : filter === "tv" ? (
            <Tv className="w-8 h-8 text-zinc-500" />
          ) : (
            <div className="flex gap-1">
              <Film className="w-6 h-6 text-zinc-500" />
              <Tv className="w-6 h-6 text-zinc-500" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-zinc-300 mb-2">
          No{" "}
          {filter === "all"
            ? "items"
            : filter === "movie"
              ? "movies"
              : "TV shows"}{" "}
          in your watchlist
        </h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          {filter === "all"
            ? "Start adding movies and TV shows to your watchlist to keep track of what you want to watch."
            : `Add some ${filter === "movie" ? "movies" : "TV shows"} to your watchlist to see them here.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredItems.map((item) => (
        <WatchlistItem
          key={`${item.contentId}-${item.type}`}
          item={item}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default WatchlistGrid;

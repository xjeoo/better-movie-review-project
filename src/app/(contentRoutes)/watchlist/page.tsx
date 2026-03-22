"use client";

import { useState, useEffect } from "react";
import { WatchlistItem } from "@/types/content";
import WatchlistGrid from "@/components/watchlist/WatchlistGrid";
import { Bookmark, Film, Tv, Loader2 } from "lucide-react";

type FilterType = "all" | "movie" | "tv";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  const fetchWatchlist = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/watchlist");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch watchlist");
      }

      setWatchlist(data.watchlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleDelete = async (contentId: string, type: string) => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "DELETE",
        body: JSON.stringify({ contentId, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete item");
      }

      setWatchlist((prev) =>
        prev.filter(
          (item) => !(item.contentId === contentId && item.type === type),
        ),
      );
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleStatusChange = async (
    contentId: string,
    type: string,
    newStatus: string,
  ) => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "PATCH",
        body: JSON.stringify({ contentId, type, newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      setWatchlist((prev) =>
        prev.map((item) =>
          item.contentId === contentId && item.type === type
            ? {
                ...item,
                watchStatus: newStatus as
                  | "Not watched"
                  | "Currently watching"
                  | "Watched",
              }
            : item,
        ),
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filterButtons: {
    value: FilterType;
    label: string;
    icon: typeof Film;
  }[] = [
    { value: "all", label: "All", icon: Bookmark },
    { value: "movie", label: "Movies", icon: Film },
    { value: "tv", label: "TV Shows", icon: Tv },
  ];

  const itemCounts = {
    all: watchlist.length,
    movie: watchlist.filter((item) => item.type === "movie").length,
    tv: watchlist.filter((item) => item.type === "tv").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-primary animate-spin" />
          <p className="text-zinc-400">Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <Bookmark className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Failed to load watchlist
          </h2>
          <p className="text-zinc-400">{error}</p>
          <button
            onClick={fetchWatchlist}
            className="px-4 py-2 bg-blue-primary hover:bg-blue-primary-darker text-white rounded-lg transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="w-8 h-8 text-blue-primary" />
            <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          </div>
          <p className="text-zinc-400">
            Keep track of movies and TV shows you want to watch
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {filterButtons.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === value
                  ? "bg-blue-primary text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <Icon size={18} />
              {label}
              <span
                className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  filter === value ? "bg-white/20" : "bg-zinc-700 text-zinc-300"
                }`}
              >
                {itemCounts[value]}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <WatchlistGrid
          items={watchlist}
          filter={filter}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default WatchlistPage;
